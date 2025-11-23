'use client';

import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ScrollToTopFab } from '@/components/Layout/ScrollToTopFab';
import { InquiryFab } from '@/components/Layout/InquiryFab';
import { HeroBanner } from '@/components/Layout/HeroBanner';
import { DiscoverSection } from '@/components/Layout/DiscoverSection';
import { PageNavigation } from '@/components/Layout/PageNavigation';
import { motion } from 'framer-motion';
import {
  Extension as ExtensionIcon,
  CloudQueue as CloudIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const theme = useTheme();
  const { t } = useLanguage();

  const features = [
    {
      icon: <ExtensionIcon sx={{ fontSize: 48 }} />,
      title: t('about.feature1.title'),
      description: t('about.feature1.description'),
    },
    {
      icon: <CloudIcon sx={{ fontSize: 48 }} />,
      title: t('about.feature2.title'),
      description: t('about.feature2.description'),
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 48 }} />,
      title: t('about.feature3.title'),
      description: t('about.feature3.description'),
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <HeroBanner
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
      />

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Introduction */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.125rem' },
              }}
            >
              {t('about.intro.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              {t('about.intro.p1')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
              }}
            >
              {t('about.intro.p2')}
            </Typography>
          </Box>

          {/* Feature Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mb: 6,
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.125rem' },
                }}
              >
                {t('about.howItWorks.title')}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
                    : 'linear-gradient(135deg, #FFFBF5 0%, #FFF5F7 100%)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box component="ol" sx={{ pl: 3, '& li': { mb: 2 } }}>
                  <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                    {t('about.howItWorks.step1')}
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                    {t('about.howItWorks.step2')}
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                    {t('about.howItWorks.step3')}
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ lineHeight: 1.8 }}>
                    {t('about.howItWorks.step4')}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Page Navigation */}
      <PageNavigation
        nextPage={{
          href: '/guide',
          label: t('features.howToUse.title'),
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
