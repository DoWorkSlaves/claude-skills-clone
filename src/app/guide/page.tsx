'use client';

import { Box, Container, Typography, Paper, useTheme, Chip } from '@mui/material';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ScrollToTopFab } from '@/components/Layout/ScrollToTopFab';
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

export default function GuidePage() {
  const theme = useTheme();
  const { t } = useLanguage();

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

      {/* FAB */}
      <ScrollToTopFab />
    </>
  );
}
