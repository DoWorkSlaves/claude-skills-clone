'use client';

import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Header } from '@/components/Layout/Header';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { getFeaturedSkills, getAllCategories } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  const featuredSkills = getFeaturedSkills();
  const categories = getAllCategories();
  const recentSkills = featuredSkills.slice(0, 3);

  const stats = [
    {
      title: t('dashboard.totalSkills'),
      value: '15',
      icon: <CategoryIcon fontSize="large" />,
      color: '#FF6B9D',
    },
    {
      title: t('dashboard.featured'),
      value: '6',
      icon: <StarIcon fontSize="large" />,
      color: '#FFB84D',
    },
    {
      title: t('dashboard.totalDownloads'),
      value: '20K+',
      icon: <DownloadIcon fontSize="large" />,
      color: '#6BCF7F',
    },
    {
      title: t('dashboard.categories'),
      value: categories.length.toString(),
      icon: <TrendingUpIcon fontSize="large" />,
      color: '#FF85A6',
    },
  ];

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {t('dashboard.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('dashboard.subtitle')}
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          {stats.map((stat) => (
            <Paper
              key={stat.title}
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Categories Section */}
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
            {t('dashboard.categoriesTitle')}
          </Typography>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="medium"
                    sx={{
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      fontWeight: 500,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer',
                      },
                      transition: 'transform 0.2s',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Recently Added Skills */}
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
            {t('dashboard.recentlyAdded')}
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
            {recentSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </Box>
        </Box>

        {/* Quick Links */}
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
            {t('dashboard.quickActions')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {t('dashboard.exploreAll')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.exploreAllDesc')}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {t('dashboard.submitSkill')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.submitSkillDesc')}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {t('dashboard.viewDocs')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('dashboard.viewDocsDesc')}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}
