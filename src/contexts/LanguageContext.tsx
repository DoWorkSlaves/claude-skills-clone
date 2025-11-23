"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

// Korean translations (default)
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Header
    "header.home": "홈",
    "header.skills": "발견",
    "header.categories": "카테고리",
    "header.search.placeholder": "이름, 설명 또는 태그로 스킬 검색...",
    "header.search.minChars": "검색하려면 최소 2자를 입력하세요",
    "header.search.noResults": "스킬을 찾을 수 없습니다",
    "header.search.tryDifferent": "다른 키워드를 시도해보세요",
    "header.search.featured": "추천",

    // Home
    "home.subtitle": "더 강력한 AI를 사용하는 방법",
    "home.description": "Claude Hub에서 강력한 AI 스킬을 만나보세요",

    // Explore
    "explore.title": "발견",
    "explore.subtitle": "바로 사용 가능한 모든 스킬을 탐색해 보세요",
    "explore.searchPlaceholder": "이름, 설명 또는 태그로 스킬 검색...",
    "explore.filterByCategory": "카테고리",
    "explore.all": "전체",
    "explore.showing": "표시 중",
    "explore.skills": "스킬",
    "explore.skill": "스킬",
    "explore.in": "카테고리:",
    "explore.matching": "검색어:",
    "explore.noResults": "스킬을 찾을 수 없습니다",
    "explore.tryAdjusting": "검색 또는 필터 조건을 조정해보세요",

    // Skills
    "skills.sortBy": "정렬:",
    "skills.mostPopular": "인기순",
    "skills.mostViewed": "조회순",
    "skills.name": "이름순",
    "skills.view": "보기:",
    "skills.featuredSkills": "추천 스킬",
    "skills.allSkills": "모든 스킬",

    // Categories
    "categories.title": "카테고리",
    "categories.subtitle": "어떤 분야의 기술이 필요하신가요?",
    "categories.skillCount": "{count}개 스킬",
    "categories.backToAll": "← 모든 카테고리로 돌아가기",
    "categories.inCategory": "이 카테고리의 {count}개 스킬",

    // Skill Detail
    "skillDetail.notFound": "스킬을 찾을 수 없습니다",
    "skillDetail.backToSkills": "스킬 목록으로 돌아가기",
    "skillDetail.download": "다운로드",
    "skillDetail.github": "GitHub",
    "skillDetail.share": "공유",
    "skillDetail.reviews": "리뷰",
    "skillDetail.whatIsIt.title": "무엇인가요?",
    "skillDetail.howToUse.title": "사용 방법",
    "skillDetail.keyFeatures.title": "주요 기능",
    "skillDetail.liked": "좋아요 완료",
    "skillDetail.like": "좋아요",

    // Comments
    "comments.section.title": "댓글",
    "comments.section.subtitle": "이 스킬에 대한 생각을 공유하세요",
    "comments.section.addComment": "댓글 작성",
    "comments.section.signInPrompt": "댓글을 작성하려면 로그인하세요",
    "comments.section.signInButton": "로그인",
    "comments.section.loadError": "댓글을 불러오는 중 오류가 발생했습니다",
    "comments.form.placeholder": "댓글을 입력하세요...",
    "comments.form.emptyError": "댓글 내용을 입력하세요",
    "comments.form.tooLongError": "댓글은 2000자를 초과할 수 없습니다",
    "comments.form.submitError": "댓글 제출 중 오류가 발생했습니다",
    "comments.form.submit": "댓글 작성",
    "comments.form.update": "수정 완료",
    "comments.form.cancel": "취소",
    "comments.form.reply": "답글 작성",
    "comments.form.ratingLabel": "이 스킬을 평가해주세요",
    "comments.form.ratingRequired": "별점을 선택해주세요",
    "comments.form.alreadyCommented": "이미 이 스킬에 댓글을 작성하셨습니다",
    "comments.list.noComments": "아직 댓글이 없습니다",
    "comments.list.beFirst": "첫 번째 댓글을 작성해보세요!",
    "comments.item.edited": "수정됨",
    "comments.item.edit": "수정",
    "comments.item.delete": "삭제",
    "comments.item.deleteConfirm": "정말 이 댓글을 삭제하시겠습니까?",
    "comments.item.reply": "답글",

    // Common
    "common.loginRequired": "로그인이 필요합니다",
    "common.linkCopied": "링크가 복사되었습니다",

    // Inquiry
    "inquiry.title": "문의하기",
    "inquiry.name": "이름",
    "inquiry.email": "이메일",
    "inquiry.typeLabel": "문의 유형",
    "inquiry.message": "메시지",
    "inquiry.submit": "문의 보내기",
    "inquiry.cancel": "취소",
    "inquiry.close": "닫기",
    "inquiry.success": "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.",
    "inquiry.error": "문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
    "inquiry.type.general": "일반 문의",
    "inquiry.type.bug": "버그 신고",
    "inquiry.type.feature": "기능 요청",
    "inquiry.type.partnership": "제휴 문의",
    "inquiry.type.other": "기타",

    // Feature Boxes
    "features.whatIs.title": "클로드 Skills란?",
    "features.whatIs.description":
      "더 나은 생산성과 창의성을 위해 클로드 AI에 장착할 수 있는 컬렉션이에요.",
    "features.howToUse.title": "어떻게 사용하나요?",
    "features.howToUse.description":
      "놀랍도록 빠르고 쉬워요. 기존 환경에 빠른 설치로 시작하세요.",
    "features.whyUse.title": "왜 사용하나요?",
    "features.whyUse.description":
      "반복적인 프롬프트 복사 붙여넣기 없이, 누구나 전문가 수준으로 AI를 활용할 수 있어요.",

    // Discover Section
    "discover.title": "추천 스킬 발견",
    "discover.subtitle": "선별된 강력한 AI 스킬을 탐색하세요",
    "discover.moreSkills.title": "더 많은 놀라운 스킬 발견",
    "discover.moreSkills.subtitle": "관심을 가질 만한 다른 스킬 탐색",

    // About Page
    "about.hero.title": "ClaudeHub란?",
    "about.hero.subtitle": "AI 기반 생산성 도구로 가는 관문",
    "about.intro.title": "AI 개발에 대한 혁신적인 접근",
    "about.intro.p1":
      "ClaudeHub는 Claude AI의 힘과 사전 구축된 기능의 포괄적인 라이브러리를 결합한 혁신적인 플랫폼입니다. 매번 처음부터 시작하는 대신 개발자는 일반적이고 복잡한 작업 모두에 대한 검증된 솔루션에 즉시 액세스할 수 있습니다.",
    "about.intro.p2":
      "AI 기능을 위한 앱 스토어로 생각하세요. 각 스킬은 우리의 전문 개발자 커뮤니티에 의해 신중하게 제작, 문서화 및 유지 관리됩니다. 코드 생성, 아트 창작, 데이터 분석 또는 워크플로 자동화가 필요하든 도움이 될 스킬이 준비되어 있습니다.",
    "about.feature1.title": "확장 가능한 플랫폼",
    "about.feature1.description":
      "ClaudeHub는 Claude Code 기능을 확장하는 AI 기반 기능의 큐레이션된 마켓플레이스입니다. 각 스킬은 특정 작업을 해결하도록 설계된 사전 구축 모듈입니다.",
    "about.feature2.title": "커뮤니티 주도",
    "about.feature2.description":
      "개발자에 의해, 개발자를 위해 구축되었습니다. 우리 커뮤니티는 코드 생성부터 창의적인 도구에 이르기까지 모두 엄격하게 테스트되고 문서화된 스킬을 기여합니다.",
    "about.feature3.title": "AI 향상 워크플로",
    "about.feature3.description":
      "컨텍스트를 이해하고, 지능형 솔루션을 생성하며, 고유한 요구 사항에 적응하는 특화된 스킬로 Claude AI의 힘을 활용하세요.",
    "about.howItWorks.title": "작동 방식",
    "about.howItWorks.step1":
      "라이브러리 탐색: 개발 도구부터 창의적인 애플리케이션까지 카테고리별로 구성된 큐레이션된 스킬 컬렉션을 탐색하세요.",
    "about.howItWorks.step2":
      "한 번의 명령으로 설치: 각 스킬에는 Claude Code와 원활하게 통합되는 간단한 설치 명령이 함께 제공됩니다.",
    "about.howItWorks.step3":
      "창작 시작: 설치되면 스킬을 즉시 사용할 수 있습니다. 구성이 필요 없습니다. 프로젝트에서 바로 사용하세요.",
    "about.howItWorks.step4":
      "공유 및 기여: 스킬이 도움이 되었나요? 자신만의 스킬을 기여하거나 오픈 소스 커뮤니티를 통해 기존 스킬을 개선하는 데 도움을 주세요.",

    // Guide Page
    "guide.hero.title": "ClaudeHub 사용 방법",
    "guide.hero.subtitle": "간단한 설치 과정으로 몇 분 안에 시작하세요",
    "guide.toggle.claudeAI": "클로드 AI",
    "guide.toggle.claudeAI.subtitle": "가장 간단함",
    "guide.toggle.claudeAI.description": "일반적인 대중적인 클로드 AI 사용자",
    "guide.toggle.claudeCode": "클로드 코드",
    "guide.toggle.claudeCode.subtitle": "모든 개발자 전용",
    "guide.toggle.claudeCode.description": "클로드 코드를 사용 중인 개발자",
    "guide.toggle.claudeAPI": "클로드 API",
    "guide.toggle.claudeAPI.subtitle": "서비스 제공자 전용",
    "guide.toggle.claudeAPI.description": "더 스마트한 당신의 서비스",
    "guide.toggle.claudeAgenticSDK": "클로드 Agentic SDK",
    "guide.toggle.claudeAgenticSDK.subtitle": "AI 에이전트 개발자 전용",
    "guide.toggle.claudeAgenticSDK.description": "더 전문적인 당신의 AI 에이전트",
    "guide.content.claudeAI.title": "클로드 AI 사용자",
    "guide.content.claudeAI.alert": "claude.ai의 유료 사용자(Pro 이상)여야 합니다.",
    "guide.content.claudeAI.selectSkills": "스킬 선택하기",
    "guide.content.claudeAI.findSkill": "원하는 스킬을 찾았나요?",
    "guide.content.claudeAI.findSkillDesc1": "스킬 옆",
    "guide.content.claudeAI.findSkillDesc2": "버튼을 눌러 zip 형식의 파일을 다운받아 주세요.",
    "guide.content.claudeAI.addSkill": "스킬을 추가하세요",
    "guide.content.claudeAI.addSkillStep1": "Claude.ai에 접속해 주세요.",
    "guide.content.claudeAI.addSkillStep2": "좌측 하단 내 프로필을 선택해주세요.",
    "guide.content.claudeAI.addSkillStep3": "\"설정\"을 선택해주세요.",
    "guide.content.claudeAI.addSkillStep4": "\"기능\" 탭을 선택해주세요.",
    "guide.content.claudeAI.addSkillStep5": "아래로 스크롤해주세요.",
    "guide.content.claudeAI.addSkillStep6": "\"스킬 업로드\" 버튼을 눌러주세요.",
    "guide.content.claudeAI.addSkillStep7": "다운로드 받았던 스킬을 추가해주세요.",
    "guide.content.claudeAI.addSkillStep8": "이제 모든 채팅에서 클로드가 스킬을 사용할 수 있어요. 👏",
    "guide.content.claudeAI.addSkillAlert": "추가가 되지 않나요? 이미 추가된 스킬은 추가할 수 없어요. 또, 일부 스킬(Anthropic 지원)은 기본적으로 추가되어 있어요.",
    "guide.content.claudeAI.faq": "FAQ",
    "guide.content.claudeAI.faq1Q": "스킬을 자동으로 사용되나요?",
    "guide.content.claudeAI.faq1A": "네! 클로드가 스스로 필요한 스킬을 선정하고 사용합니다. 특정 스킬을 사용하라고 명령할 수도 있어요.",
    "guide.content.claudeAI.faq2Q": "스킬을 사용한 게 맞는지 확인할 수 있나요?",
    "guide.content.claudeAI.faq2A": "클로드의 답변에서 스킬 사용 여부를 확인할 수 있어요. \"~스킬\"을 사용한다는 메시지가 나와요.",
    "guide.content.claudeAI.faq3Q": "추가한 스킬이 반영되지 않아요.",
    "guide.content.claudeAI.faq3A": "스킬을 추가한 이후, \"새 채팅\"을 통해 새로운 대화를 시작해주세요. 기존 대화에서는 신규 스킬을 알 수 없을 가능성이 있어요.",
    "guide.content.lastEdit": "최종 수정일",
    "guide.content.requestFix": "수정 요청",
    "guide.intro.title": "시작하기 쉽습니다",
    "guide.intro.subtitle":
      "다음 간단한 단계를 따라 프로젝트에서 ClaudeHub 사용을 시작하세요. 복잡한 설정이나 구성이 필요 없습니다. 설치하고 사용하세요!",
    "guide.step1.title": "스킬 찾기",
    "guide.step1.description":
      "조직된 카테고리를 탐색하거나 검색 바를 사용하여 필요에 맞는 스킬을 찾으세요. 각 스킬에는 자세한 문서와 예제가 함께 제공됩니다.",
    "guide.step1.tip1": "필터를 사용하여 결과 좁히기",
    "guide.step1.tip2": "평점과 리뷰 확인",
    "guide.step1.tip3": "문서 읽기",
    "guide.step2.title": "스킬 설치",
    "guide.step2.description":
      "스킬 페이지에서 설치 명령을 복사하여 Claude Code 터미널에서 실행하세요. 설치는 즉시 이루어지며 추가 구성이 필요 없습니다.",
    "guide.step2.tip1": "Claude Code가 실행 중인지 확인",
    "guide.step2.tip2": "터미널 권한 확인",
    "guide.step2.tip3": "설치 성공 확인",
    "guide.step3.title": "스킬 사용",
    "guide.step3.description":
      "설치되면 스킬을 즉시 사용할 수 있습니다. Claude Code 명령을 통해 호출하거나 작업과 관련이 있을 때 Claude가 제안하도록 하세요.",
    "guide.step3.tip1": "먼저 예제 시도",
    "guide.step3.tip2": "사용 가능한 모든 옵션 탐색",
    "guide.step3.tip3": "사용 팁 읽기",
    "guide.step4.title": "사용자 지정 및 확장",
    "guide.step4.description":
      "대부분의 스킬은 매개변수 및 구성 파일을 통한 사용자 지정을 지원합니다. 고급 사용자는 스킬을 포크하고 특정 요구 사항에 맞게 수정할 수 있습니다.",
    "guide.step4.tip1": "구성 옵션 확인",
    "guide.step4.tip2": "개선 사항 기여",
    "guide.step4.tip3": "사용자 지정 공유",
    "guide.proTips.title": "전문가 팁",
    "guide.proTips.tip1": "인기 있는 스킬부터 시작하여 플랫폼에 익숙해지세요",
    "guide.proTips.tip2":
      "커뮤니티 Discord에 참여하여 도움을 받고 경험을 공유하세요",
    "guide.proTips.tip3":
      "새 버전을 정기적으로 확인하여 스킬을 최신 상태로 유지하세요",
    "guide.proTips.tip4": "여러 스킬을 결합하여 강력한 워크플로 만들기",

    // Benefits Page
    "benefits.hero.title": "왜 ClaudeHub를 선택하나요?",
    "benefits.hero.subtitle": "검증되고 커뮤니티 기반 솔루션으로 개발 가속화",
    "benefits.intro.title": "현대 개발자를 위한 현명한 선택",
    "benefits.intro.subtitle":
      "오늘날의 빠른 속도의 개발 세계에서 효율성이 전부입니다. ClaudeHub는 수천 명의 개발자의 집단적 지혜를 활용하여 더 나은, 더 빠른, 더 스마트한 빌드를 가능하게 합니다.",
    "benefits.benefit1.title": "개발 시간 절약",
    "benefits.benefit1.description":
      "보일러플레이트를 건너뛰고 중요한 것에 집중하세요. 사전 구축된 스킬은 몇 시간의 설정과 구성을 제거하여 더 빠르게 기능을 제공할 수 있게 합니다.",
    "benefits.benefit1.stat": "80% 더 빠른",
    "benefits.benefit1.statLabel": "개발 속도",
    "benefits.benefit2.title": "검증된 품질",
    "benefits.benefit2.description":
      "모든 스킬은 우리 커뮤니티에서 검토, 테스트 및 유지 관리됩니다. 집단적 전문 지식의 혜택을 받고 일반적인 함정을 피하세요.",
    "benefits.benefit2.stat": "100%",
    "benefits.benefit2.statLabel": "코드 검토됨",
    "benefits.benefit3.title": "강력한 커뮤니티",
    "benefits.benefit3.description":
      "ClaudeHub로 빌드하는 수천 명의 개발자와 함께하세요. 지원을 받고, 지식을 공유하고, 성장하는 생태계에 기여하세요.",
    "benefits.benefit3.stat": "10K+",
    "benefits.benefit3.statLabel": "활성 개발자",
    "benefits.benefit4.title": "안전하고 신뢰할 수 있음",
    "benefits.benefit4.description":
      "모든 스킬은 보안 모범 사례를 따르며 정기적으로 업데이트됩니다. 신뢰할 수 있고 감사된 코드로 프로젝트를 안전하게 유지하세요.",
    "benefits.benefit4.stat": "99.9%",
    "benefits.benefit4.statLabel": "가동 시간 보장",
    "benefits.benefit5.title": "최첨단 AI",
    "benefits.benefit5.description":
      "특화된 스킬을 통해 최신 Claude AI 기능을 활용하세요. 연구 오버헤드 없이 AI 혁신의 최전선에 머무르세요.",
    "benefits.benefit5.stat": "최신",
    "benefits.benefit5.statLabel": "AI 모델",
    "benefits.benefit6.title": "지속적인 성장",
    "benefits.benefit6.description":
      "매주 새로운 스킬이 추가됩니다. 플랫폼은 귀하의 필요에 따라 진화하여 항상 최신 도구와 기술에 액세스할 수 있도록 합니다.",
    "benefits.benefit6.stat": "50+",
    "benefits.benefit6.statLabel": "월별 새 스킬",
    "benefits.testimonials.title": "전 세계 개발자가 사랑합니다",
    "benefits.testimonial1.quote":
      "ClaudeHub는 Claude로 빌드하는 방식을 변화시켰습니다. 며칠이 걸리던 일이 이제는 몇 시간이면 됩니다.",
    "benefits.testimonial1.author": "Sarah Chen",
    "benefits.testimonial1.role": "시니어 개발자",
    "benefits.testimonial2.quote":
      "품질과 문서가 뛰어납니다. 프로덕션에서 이러한 스킬을 신뢰할 수 있습니다.",
    "benefits.testimonial2.author": "Michael Rodriguez",
    "benefits.testimonial2.role": "테크 리드",
    "benefits.testimonial3.quote":
      "이 커뮤니티의 일원이 되어 학습이 가속화되고 더 나은 개발자가 되었습니다.",
    "benefits.testimonial3.author": "Aisha Patel",
    "benefits.testimonial3.role": "풀스택 엔지니어",

    // Search Bar
    "searchBar.placeholder": "어떤 기술이 필요하신가요?",
    "searchBar.hint": "엔터 키를 눌러 탐색",
  },
  en: {
    // Header
    "header.home": "Home",
    "header.skills": "Discover",
    "header.categories": "Categories",
    "header.search.placeholder":
      "Search skills by name, description, or tags...",
    "header.search.minChars": "Type at least 2 characters to search",
    "header.search.noResults": "No skills found",
    "header.search.tryDifferent": "Try different keywords",
    "header.search.featured": "Featured",

    // Home
    "home.subtitle": "Unlock the Full Potential of AI",
    "home.description": "Discover powerful extensions at Claude Hub",

    // Explore
    "explore.title": "Explore Skills",
    "explore.subtitle": "Discover and search through all available AI skills",
    "explore.searchPlaceholder":
      "Search skills by name, description, or tags...",
    "explore.filterByCategory": "Filter by Category",
    "explore.all": "All",
    "explore.showing": "Showing",
    "explore.skills": "skills",
    "explore.skill": "skill",
    "explore.in": "in",
    "explore.matching": "matching",
    "explore.noResults": "No skills found",
    "explore.tryAdjusting": "Try adjusting your search or filter criteria",

    // Skills
    "skills.sortBy": "Sort by:",
    "skills.mostPopular": "Most Popular",
    "skills.mostViewed": "Most Viewed",
    "skills.name": "Name",
    "skills.view": "View:",
    "skills.featuredSkills": "Featured Skills",
    "skills.allSkills": "All Skills",

    // Categories
    "categories.title": "Browse by Category",
    "categories.subtitle":
      "Explore skills organized by {count} different categories",
    "categories.skillCount": "{count} skills",
    "categories.backToAll": "← Back to all categories",
    "categories.inCategory": "{count} skills in this category",

    // Skill Detail
    "skillDetail.notFound": "Skill not found",
    "skillDetail.backToSkills": "Back to Skills",
    "skillDetail.download": "Download",
    "skillDetail.github": "GitHub",
    "skillDetail.share": "Share",
    "skillDetail.reviews": "reviews",
    "skillDetail.whatIsIt.title": "What is it?",
    "skillDetail.howToUse.title": "How to Use",
    "skillDetail.keyFeatures.title": "Key Features",
    "skillDetail.liked": "Liked",
    "skillDetail.like": "Like",

    // Comments
    "comments.section.title": "Comments",
    "comments.section.subtitle": "Share your thoughts about this skill",
    "comments.section.addComment": "Add a comment",
    "comments.section.signInPrompt": "Sign in to leave a comment",
    "comments.section.signInButton": "Sign In",
    "comments.section.loadError": "Error loading comments",
    "comments.form.placeholder": "Write your comment...",
    "comments.form.emptyError": "Please enter a comment",
    "comments.form.tooLongError": "Comment cannot exceed 2000 characters",
    "comments.form.submitError": "Error submitting comment",
    "comments.form.submit": "Post Comment",
    "comments.form.update": "Update",
    "comments.form.cancel": "Cancel",
    "comments.form.reply": "Reply",
    "comments.form.ratingLabel": "Rate this skill",
    "comments.form.ratingRequired": "Please select a rating",
    "comments.form.alreadyCommented":
      "You have already commented on this skill",
    "comments.list.noComments": "No comments yet",
    "comments.list.beFirst": "Be the first to comment!",
    "comments.item.edited": "Edited",
    "comments.item.edit": "Edit",
    "comments.item.delete": "Delete",
    "comments.item.deleteConfirm":
      "Are you sure you want to delete this comment?",
    "comments.item.reply": "Reply",

    // Common
    "common.loginRequired": "Login required",
    "common.linkCopied": "Link copied to clipboard",

    // Inquiry
    "inquiry.title": "Contact Us",
    "inquiry.name": "Name",
    "inquiry.email": "Email",
    "inquiry.typeLabel": "Inquiry Type",
    "inquiry.message": "Message",
    "inquiry.submit": "Send Inquiry",
    "inquiry.cancel": "Cancel",
    "inquiry.close": "Close",
    "inquiry.success": "Your inquiry has been submitted successfully. We will respond shortly.",
    "inquiry.error": "An error occurred while sending your inquiry. Please try again.",
    "inquiry.type.general": "General Inquiry",
    "inquiry.type.bug": "Bug Report",
    "inquiry.type.feature": "Feature Request",
    "inquiry.type.partnership": "Partnership",
    "inquiry.type.other": "Other",

    // Feature Boxes
    "features.whatIs.title": "What are Claude Skills?",
    "features.whatIs.description":
      "A curated collection designed to supercharge your productivity and creativity on Claude AI",
    "features.howToUse.title": "Getting Started",
    "features.howToUse.description":
      "Seamless integration. Install and deploy to your workflow in seconds.",
    "features.whyUse.title": "Why Claude Hub?",
    "features.whyUse.description":
      "Stop Copy-Pasting. Leverage expert-level AI workflows without the manual grind.",

    // Discover Section
    "discover.title": "Discover Featured Skills",
    "discover.subtitle": "Explore our curated selection of powerful AI skills",
    "discover.moreSkills.title": "Discover More Amazing Skills",
    "discover.moreSkills.subtitle":
      "Explore other skills that might interest you",

    // About Page
    "about.hero.title": "What's ClaudeHub?",
    "about.hero.subtitle": "Your Gateway to AI-Powered Productivity Tools",
    "about.intro.title": "A Revolutionary Approach to AI Development",
    "about.intro.p1":
      "ClaudeHub is an innovative platform that combines the power of Claude AI with a comprehensive library of pre-built capabilities. Instead of starting from scratch every time, developers get instant access to proven solutions for both common and complex tasks.",
    "about.intro.p2":
      "Think of it as an app store for AI capabilities. Each skill is carefully crafted, documented, and maintained by our community of expert developers. Whether you need code generation, art creation, data analysis, or workflow automation, there's a skill ready to help.",
    "about.feature1.title": "Extensible Platform",
    "about.feature1.description":
      "ClaudeHub is a curated marketplace of AI-powered capabilities that extend Claude Code's functionality. Each skill is a pre-built module designed to solve specific tasks.",
    "about.feature2.title": "Community-Driven",
    "about.feature2.description":
      "Built by developers, for developers. Our community contributes skills ranging from code generation to creative tools, all rigorously tested and documented.",
    "about.feature3.title": "AI-Enhanced Workflows",
    "about.feature3.description":
      "Harness the power of Claude AI through specialized skills that understand context, generate intelligent solutions, and adapt to your unique needs.",
    "about.howItWorks.title": "How It Works",
    "about.howItWorks.step1":
      "Browse the Library: Explore our curated collection of skills, organized by category from development tools to creative applications.",
    "about.howItWorks.step2":
      "Install with One Command: Each skill comes with a simple install command that integrates seamlessly with Claude Code.",
    "about.howItWorks.step3":
      "Start Creating: Once installed, skills are immediately available. No configuration needed - just start using them in your projects.",
    "about.howItWorks.step4":
      "Share & Contribute: Found a skill helpful? Contribute your own or help improve existing ones through our open-source community.",

    // Guide Page
    "guide.hero.title": "How to Use ClaudeHub",
    "guide.hero.subtitle":
      "Get started in minutes with our simple installation process",
    "guide.toggle.claudeAI": "Claude AI",
    "guide.toggle.claudeAI.subtitle": "The Simplest",
    "guide.toggle.claudeAI.description": "For general Claude AI users",
    "guide.toggle.claudeCode": "Claude Code",
    "guide.toggle.claudeCode.subtitle": "For All Developers",
    "guide.toggle.claudeCode.description": "Developers using Claude Code",
    "guide.toggle.claudeAPI": "Claude API",
    "guide.toggle.claudeAPI.subtitle": "For Service Providers",
    "guide.toggle.claudeAPI.description": "Make your service smarter",
    "guide.toggle.claudeAgenticSDK": "Claude Agentic SDK",
    "guide.toggle.claudeAgenticSDK.subtitle": "For AI Agent Developers",
    "guide.toggle.claudeAgenticSDK.description": "Build more professional AI agents",
    "guide.content.claudeAI.title": "Claude AI User",
    "guide.content.claudeAI.alert": "You must be a paid user of claude.ai (Pro or higher).",
    "guide.content.claudeAI.selectSkills": "Select Skills",
    "guide.content.claudeAI.findSkill": "Found the skill you want?",
    "guide.content.claudeAI.findSkillDesc1": "Press the",
    "guide.content.claudeAI.findSkillDesc2": "button next to the skill to download a zip file.",
    "guide.content.claudeAI.addSkill": "Add the skill",
    "guide.content.claudeAI.addSkillStep1": "Go to Claude.ai.",
    "guide.content.claudeAI.addSkillStep2": "Select your profile at the bottom left.",
    "guide.content.claudeAI.addSkillStep3": "Select \"Settings\".",
    "guide.content.claudeAI.addSkillStep4": "Select the \"Features\" tab.",
    "guide.content.claudeAI.addSkillStep5": "Scroll down.",
    "guide.content.claudeAI.addSkillStep6": "Press the \"Upload Skill\" button.",
    "guide.content.claudeAI.addSkillStep7": "Add the skill you downloaded.",
    "guide.content.claudeAI.addSkillStep8": "Now Claude can use the skill in all chats. 👏",
    "guide.content.claudeAI.addSkillAlert": "Can't add the skill? Skills that are already added cannot be added again. Also, some skills (Anthropic supported) are added by default.",
    "guide.content.claudeAI.faq": "FAQ",
    "guide.content.claudeAI.faq1Q": "Are skills used automatically?",
    "guide.content.claudeAI.faq1A": "Yes! Claude selects and uses the necessary skills on its own. You can also command it to use a specific skill.",
    "guide.content.claudeAI.faq2Q": "Can I confirm if a skill was used?",
    "guide.content.claudeAI.faq2A": "You can check if a skill was used in Claude's response. A message saying \"using ~skill\" will appear.",
    "guide.content.claudeAI.faq3Q": "The skill I added is not reflected.",
    "guide.content.claudeAI.faq3A": "After adding a skill, please start a new conversation through \"New Chat\". Existing conversations may not recognize newly added skills.",
    "guide.content.lastEdit": "Last edited",
    "guide.content.requestFix": "Request Fix",
    "guide.intro.title": "Getting Started is Easy",
    "guide.intro.subtitle":
      "Follow these simple steps to start using ClaudeHub in your projects. No complex setup or configuration required - just install and use!",
    "guide.step1.title": "Find a Skill",
    "guide.step1.description":
      "Browse through our organized categories or use the search bar to find the perfect skill for your needs. Each skill comes with detailed documentation and examples.",
    "guide.step1.tip1": "Use filters to narrow down results",
    "guide.step1.tip2": "Check ratings and reviews",
    "guide.step1.tip3": "Read the documentation",
    "guide.step2.title": "Install the Skill",
    "guide.step2.description":
      "Copy the install command from the skill page and run it in your Claude Code terminal. Installation is instant and requires no additional configuration.",
    "guide.step2.tip1": "Ensure Claude Code is running",
    "guide.step2.tip2": "Check terminal permissions",
    "guide.step2.tip3": "Verify successful installation",
    "guide.step3.title": "Use the Skill",
    "guide.step3.description":
      "Once installed, the skill is immediately available to use. Invoke it through Claude Code commands or let Claude suggest it when relevant to your task.",
    "guide.step3.tip1": "Try examples first",
    "guide.step3.tip2": "Explore all available options",
    "guide.step3.tip3": "Read usage tips",
    "guide.step4.title": "Customize & Extend",
    "guide.step4.description":
      "Most skills support customization through parameters and configuration files. Advanced users can fork skills and modify them for specific needs.",
    "guide.step4.tip1": "Check configuration options",
    "guide.step4.tip2": "Contribute improvements",
    "guide.step4.tip3": "Share your customizations",
    "guide.proTips.title": "Pro Tips",
    "guide.proTips.tip1":
      "Start with popular skills to get familiar with the platform",
    "guide.proTips.tip2":
      "Join the community Discord for help and to share your experiences",
    "guide.proTips.tip3":
      "Keep skills updated by regularly checking for new versions",
    "guide.proTips.tip4":
      "Combine multiple skills to create powerful workflows",

    // Benefits Page
    "benefits.hero.title": "Why Choose ClaudeHub?",
    "benefits.hero.subtitle":
      "Accelerate your development with proven, community-driven solutions",
    "benefits.intro.title": "The Smart Choice for Modern Developers",
    "benefits.intro.subtitle":
      "In today's fast-paced development world, efficiency is everything. ClaudeHub harnesses the collective wisdom of thousands of developers to help you build better, faster, and smarter.",
    "benefits.benefit1.title": "Save Development Time",
    "benefits.benefit1.description":
      "Skip the boilerplate and focus on what matters. Pre-built skills eliminate hours of setup and configuration, letting you deliver features faster.",
    "benefits.benefit1.stat": "80% Faster",
    "benefits.benefit1.statLabel": "Development Speed",
    "benefits.benefit2.title": "Proven Quality",
    "benefits.benefit2.description":
      "Every skill is reviewed, tested, and maintained by our community. Benefit from collective expertise and avoid common pitfalls.",
    "benefits.benefit2.stat": "100%",
    "benefits.benefit2.statLabel": "Code Reviewed",
    "benefits.benefit3.title": "Powerful Community",
    "benefits.benefit3.description":
      "Join thousands of developers building with ClaudeHub. Get support, share knowledge, and contribute to a growing ecosystem.",
    "benefits.benefit3.stat": "10K+",
    "benefits.benefit3.statLabel": "Active Developers",
    "benefits.benefit4.title": "Secure & Reliable",
    "benefits.benefit4.description":
      "All skills follow security best practices and are regularly updated. Keep your projects safe with trusted, audited code.",
    "benefits.benefit4.stat": "99.9%",
    "benefits.benefit4.statLabel": "Uptime Guarantee",
    "benefits.benefit5.title": "Cutting-Edge AI",
    "benefits.benefit5.description":
      "Leverage the latest Claude AI capabilities through specialized skills. Stay at the forefront of AI innovation without the research overhead.",
    "benefits.benefit5.stat": "Latest",
    "benefits.benefit5.statLabel": "AI Models",
    "benefits.benefit6.title": "Continuous Growth",
    "benefits.benefit6.description":
      "New skills added weekly. The platform evolves with your needs, ensuring you always have access to the latest tools and techniques.",
    "benefits.benefit6.stat": "50+",
    "benefits.benefit6.statLabel": "New Skills Monthly",
    "benefits.testimonials.title": "Loved by Developers Worldwide",
    "benefits.testimonial1.quote":
      "ClaudeHub transformed how I build with Claude. What used to take days now takes hours.",
    "benefits.testimonial1.author": "Sarah Chen",
    "benefits.testimonial1.role": "Senior Developer",
    "benefits.testimonial2.quote":
      "The quality and documentation are outstanding. I trust these skills in production.",
    "benefits.testimonial2.author": "Michael Rodriguez",
    "benefits.testimonial2.role": "Tech Lead",
    "benefits.testimonial3.quote":
      "Being part of this community has accelerated my learning and made me a better developer.",
    "benefits.testimonial3.author": "Aisha Patel",
    "benefits.testimonial3.role": "Full-Stack Engineer",

    // Search Bar
    "searchBar.placeholder": "Find the perfect skill for your challenge",
    "searchBar.hint": "Press Enter to explore",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("ko"); // Default to Korean
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "ko" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
