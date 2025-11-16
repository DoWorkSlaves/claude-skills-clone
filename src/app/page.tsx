'use client';

import dynamic from 'next/dynamic';
import { Container, Typography, Box } from '@mui/material';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { getFeaturedSkills, getLatestSkills } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = dynamic(() => import('@/components/Layout/Header').then(mod => ({ default: mod.Header })), {
  ssr: false,
});

export default function Home() {
  const { t } = useLanguage();
  const featuredSkills = getFeaturedSkills();
  const latestSkills = getLatestSkills();

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 }, px: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
            }}
          >
            {t('home.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.125rem' },
            }}
          >
            {t('home.subtitle')}
          </Typography>
        </Box>

        {/* Featured Skills Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            {t('home.featured')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </Box>
        </Box>

        {/* Latest Skills Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            {t('home.latest')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {latestSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}
