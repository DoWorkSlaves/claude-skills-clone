'use client';

import { useState } from 'react';
import { Box, Container, Typography, Paper, useTheme, Chip, ToggleButtonGroup, ToggleButton, Alert, Button, Link } from '@mui/material';
import {
  Edit as EditIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ScrollToTopFab } from '@/components/Layout/ScrollToTopFab';
import { InquiryFab } from '@/components/Layout/InquiryFab';
import { HeroBanner } from '@/components/Layout/HeroBanner';
import { DiscoverSection } from '@/components/Layout/DiscoverSection';
import { PageNavigation } from '@/components/Layout/PageNavigation';
import { motion } from 'framer-motion';
import {
  Search as SearchIcon,
  GetApp as InstallIcon,
  PlayArrow as PlayIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';

type GuideType = 'claudeAI' | 'claudeCode' | 'claudeAPI' | 'claudeAgenticSDK';

export default function GuidePage() {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const [selectedGuide, setSelectedGuide] = useState<GuideType>('claudeAI');

  const handleGuideChange = (_event: React.MouseEvent<HTMLElement>, newGuide: GuideType | null) => {
    if (newGuide !== null) {
      setSelectedGuide(newGuide);
    }
  };

  const guideOptions: { value: GuideType; labelKey: string; subtitleKey: string; descriptionKey: string }[] = [
    { value: 'claudeAI', labelKey: 'guide.toggle.claudeAI', subtitleKey: 'guide.toggle.claudeAI.subtitle', descriptionKey: 'guide.toggle.claudeAI.description' },
    { value: 'claudeCode', labelKey: 'guide.toggle.claudeCode', subtitleKey: 'guide.toggle.claudeCode.subtitle', descriptionKey: 'guide.toggle.claudeCode.description' },
    { value: 'claudeAPI', labelKey: 'guide.toggle.claudeAPI', subtitleKey: 'guide.toggle.claudeAPI.subtitle', descriptionKey: 'guide.toggle.claudeAPI.description' },
    { value: 'claudeAgenticSDK', labelKey: 'guide.toggle.claudeAgenticSDK', subtitleKey: 'guide.toggle.claudeAgenticSDK.subtitle', descriptionKey: 'guide.toggle.claudeAgenticSDK.description' },
  ];

  const selectedOption = guideOptions.find(opt => opt.value === selectedGuide);

  // Last edit dates for each guide type
  const lastEditDates: Record<GuideType, string> = {
    claudeAI: '2024.11.23',
    claudeCode: '2024.11.23',
    claudeAPI: '2024.11.23',
    claudeAgenticSDK: '2024.11.23',
  };

  // Handle request fix - scroll to inquiry FAB
  const handleRequestFix = () => {
    // Find and click the inquiry FAB
    const inquiryFab = document.querySelector('[aria-label="inquiry"]') as HTMLButtonElement;
    if (inquiryFab) {
      inquiryFab.click();
    }
  };

  const steps = [
    {
      number: '01',
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: t('guide.step1.title'),
      description: t('guide.step1.description'),
      tips: [t('guide.step1.tip1'), t('guide.step1.tip2'), t('guide.step1.tip3')],
    },
    {
      number: '02',
      icon: <InstallIcon sx={{ fontSize: 40 }} />,
      title: t('guide.step2.title'),
      description: t('guide.step2.description'),
      tips: [t('guide.step2.tip1'), t('guide.step2.tip2'), t('guide.step2.tip3')],
    },
    {
      number: '03',
      icon: <PlayIcon sx={{ fontSize: 40 }} />,
      title: t('guide.step3.title'),
      description: t('guide.step3.description'),
      tips: [t('guide.step3.tip1'), t('guide.step3.tip2'), t('guide.step3.tip3')],
    },
    {
      number: '04',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: t('guide.step4.title'),
      description: t('guide.step4.description'),
      tips: [t('guide.step4.tip1'), t('guide.step4.tip2'), t('guide.step4.tip3')],
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <HeroBanner
        title={t('guide.hero.title')}
        subtitle={t('guide.hero.subtitle')}
      />

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Introduction */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.125rem' },
              }}
            >
              {t('guide.intro.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              {t('guide.intro.subtitle')}
            </Typography>
          </Box>

          {/* Guide Type Toggle */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <ToggleButtonGroup
                value={selectedGuide}
                exclusive
                onChange={handleGuideChange}
                aria-label="guide type"
                sx={{
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  '& .MuiToggleButton-root': {
                    px: { xs: 2, md: 3 },
                    py: 1.5,
                    borderColor: theme.palette.divider,
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #ff6b35 0%, #ffc857 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ff8a5c 0%, #ffd477 100%)',
                      },
                    },
                  },
                }}
              >
                {guideOptions.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        {t(option.labelKey)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: { xs: '0.65rem', md: '0.75rem' },
                          opacity: 0.8,
                          display: 'block',
                        }}
                      >
                        {t(option.subtitleKey)}
                      </Typography>
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {/* Selected Option Description */}
            {selectedOption && (
              <motion.div
                key={selectedGuide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      mb: 0.5,
                    }}
                  >
                    {t(selectedOption.subtitleKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {t(selectedOption.descriptionKey)}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Guide Content based on selection */}
          {selectedGuide === 'claudeAI' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 6,
                }}
              >
                {/* Title */}
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                  }}
                >
                  {t('guide.content.claudeAI.title')}
                </Typography>

                {/* Last Edit Date and Request Fix Button */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {t('guide.content.lastEdit')}: {lastEditDates.claudeAI}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={handleRequestFix}
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        backgroundColor: 'rgba(255, 107, 53, 0.08)',
                      },
                    }}
                  >
                    {t('guide.content.requestFix')}
                  </Button>
                </Box>

                {/* Alert */}
                <Alert
                  severity="warning"
                  sx={{
                    mb: 4,
                    '& .MuiAlert-message': {
                      fontWeight: 500,
                    },
                  }}
                >
                  {t('guide.content.claudeAI.alert')}
                </Alert>

                {/* Select Skills Section */}
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  {t('guide.content.claudeAI.selectSkills')}
                </Typography>

                {/* Select Skills content */}
                <Box sx={{ mb: 4 }}>
                  {/* Find Skill h4 */}
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    {t('guide.content.claudeAI.findSkill')}
                  </Typography>

                  {/* Find Skill content */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      {t('guide.content.claudeAI.findSkillDesc1')}
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        sx={{
                          pointerEvents: 'none',
                          textTransform: 'none',
                        }}
                      >
                        {t('skillDetail.download')}
                      </Button>
                      {t('guide.content.claudeAI.findSkillDesc2')}
                    </Typography>
                  </Box>

                  {/* Add Skill h4 */}
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                  >
                    {t('guide.content.claudeAI.addSkill')}
                  </Typography>

                  {/* Add Skill content */}
                  <Box
                    component="ol"
                    sx={{
                      pl: 3,
                      m: 0,
                      listStyleType: 'decimal',
                      '& li': {
                        display: 'list-item',
                      },
                    }}
                  >
                    {/* Step 1 */}
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 2,
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      <Link
                        href="https://claude.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Claude.ai
                      </Link>
                      {language === 'ko' ? '에 접속해 주세요.' : ' - Go to the website.'}
                    </Typography>

                    {/* Step 2 */}
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 2,
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {t('guide.content.claudeAI.addSkillStep2')}
                    </Typography>

                    {/* Screenshot for Step 2 */}
                    <Box
                      sx={{
                        ml: -3,
                        mb: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src="/screenshots/guide/1.png"
                        alt="Select profile"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 400,
                          height: 'auto',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: theme.shadows[2],
                        }}
                      />
                    </Box>

                    {/* Step 3 */}
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 2,
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {t('guide.content.claudeAI.addSkillStep3')}
                    </Typography>

                    {/* Screenshot for Step 3 */}
                    <Box
                      sx={{
                        ml: -3,
                        mb: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src="/screenshots/guide/2.png"
                        alt="Select settings"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 400,
                          height: 'auto',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: theme.shadows[2],
                        }}
                      />
                    </Box>

                    {/* Step 4 */}
                    <Typography
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 2,
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {t('guide.content.claudeAI.addSkillStep4')}
                    </Typography>

                    {/* Screenshot for Step 4 */}
                    <Box
                      sx={{
                        ml: -3,
                        mb: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src="/screenshots/guide/3.png"
                        alt="Select features tab"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 400,
                          height: 'auto',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: theme.shadows[2],
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* FAQ Section */}
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  {t('guide.content.claudeAI.faq')}
                </Typography>

                {/* FAQ content will be added here */}
                <Box>
                  {/* FAQ placeholder */}
                </Box>
              </Paper>
            </motion.div>
          )}

          {/* Step-by-Step Guide */}
          <Box sx={{ mb: 8 }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 3, md: 4 },
                    mb: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  {/* Step Number Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      fontSize: '6rem',
                      fontWeight: 900,
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(0, 0, 0, 0.03)',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    {step.number}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mt: 1,
                        display: { xs: 'none', md: 'block' },
                      }}
                    >
                      {step.icon}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.8 }}
                      >
                        {step.description}
                      </Typography>

                      {/* Tips */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {step.tips.map((tip) => (
                          <Chip
                            key={tip}
                            label={tip}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Box>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(255, 184, 77, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 107, 157, 0.05) 0%, rgba(255, 184, 77, 0.05) 100%)',
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                {t('guide.proTips.title')}
              </Typography>
              <Box component="ul" sx={{ pl: 3, '& li': { mb: 1.5 } }}>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                  {t('guide.proTips.tip1')}
                </Typography>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                  {t('guide.proTips.tip2')}
                </Typography>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                  {t('guide.proTips.tip3')}
                </Typography>
                <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                  {t('guide.proTips.tip4')}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* Page Navigation */}
      <PageNavigation
        prevPage={{
          href: '/about',
          label: t('features.whatIs.title'),
        }}
        nextPage={{
          href: '/benefits',
          label: t('features.whyUse.title'),
        }}
      />

      {/* Discover Section */}
      <DiscoverSection />

      {/* Footer */}
      <Footer />

      {/* FABs */}
      <InquiryFab />
      <ScrollToTopFab />
    </>
  );
}
