import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { name, email, message, type } = await req.json();

        const SLACK_URL = Deno.env.get('SLACK_WEBHOOK_URL');
        const GOOGLE_ID = Deno.env.get('GOOGLE_ID');       // 보내는 계정 (발송자)
        const GOOGLE_PW = Deno.env.get('GOOGLE_APP_PASSWORD');

        // [변경점 1] 여러 명의 수신자 리스트 가져오기
        // 만약 DEVELOPER_EMAILS가 없으면, 기본적으로 GOOGLE_ID(본인)에게 보냄
        const RECIPIENTS = Deno.env.get('DEVELOPER_EMAILS') || GOOGLE_ID;

        if (!SLACK_URL || !GOOGLE_ID || !GOOGLE_PW) {
            throw new Error('환경 변수 설정이 누락되었습니다.');
        }

        // ---------------------------------------------------
        // Task A: 구글 SMTP (여러 명에게 전송)
        // ---------------------------------------------------
        const sendToEmail = async () => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: GOOGLE_ID,
                    pass: GOOGLE_PW,
                },
            });

            const mailOptions = {
                from: `"Claude Clone 알림봇" <${GOOGLE_ID}>`,
                to: RECIPIENTS, // [변경점 2] 여기가 여러 명으로 바뀜! (예: "a@test.com, b@test.com")
                replyTo: email,
                subject: `[문의접수] ${name}님 - ${type || '일반'}`,
                html: `
          <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
            <h2 style="color: #2c3e50;">새로운 문의가 도착했습니다.</h2>
            <p><strong>받는 사람들:</strong> ${RECIPIENTS}</p>
            <ul style="list-style: none; padding: 0;">
              <li><strong>보낸 사람:</strong> ${name}</li>
              <li><strong>이메일:</strong> ${email}</li>
              <li><strong>유형:</strong> ${type}</li>
            </ul>
            <hr>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        `,
            };

            await transporter.sendMail(mailOptions);
            console.log(`✅ 이메일 전송 완료 (수신자: ${RECIPIENTS})`);
        };

        // ---------------------------------------------------
        // Task B: 슬랙 전송 (동일함)
        // ---------------------------------------------------
        const sendToSlack = async () => {
            const slackBody = {
                text: `🔔 [문의] ${name}님의 메시지`,
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*🔔 새로운 문의 도착*\n*이름:* ${name} (${email})\n*유형:* ${type || '일반'}`
                        }
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*내용:*\n>${message.replace(/\n/g, '\n>')}`
                        }
                    }
                ]
            };

            const res = await fetch(SLACK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slackBody),
            });

            if (!res.ok) throw new Error(`Slack Error: ${await res.text()}`);
            console.log('✅ 슬랙 전송 완료');
        };

        await Promise.all([sendToEmail(), sendToSlack()]);

        return new Response(
            JSON.stringify({ message: '문의가 성공적으로 접수되었습니다.' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );

    } catch (error) {
        console.error('에러 발생:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});