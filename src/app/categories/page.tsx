'use client';

import { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActionArea } from '@mui/material';
import {
  Code as CodeIcon,
  Palette as PaletteIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Header } from '@/components/Layout/Header';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { getAllCategories, getSkillsByCategory } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

const categoryIcons: Record<string, React.ReactNode> = {
  Dev: <CodeIcon fontSize="large" />,
  Creative: <PaletteIcon fontSize="large" />,
  Design: <PaletteIcon fontSize="large" />,
  Office: <DescriptionIcon fontSize="large" />,
  Productivity: <TrendingUpIcon fontSize="large" />,
  Communication: <ChatIcon fontSize="large" />,
  Meta: <CategoryIcon fontSize="large" />,
};

const categoryColors: Record<string, string> = {
  Dev: '#3b82f6',
  Creative: '#8b5cf6',
  Design: '#ec4899',
  Office: '#6366f1',
  Productivity: '#10b981',
  Communication: '#f59e0b',
  Meta: '#06b6d4',
};

export default function CategoriesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  const categorySkills = selectedCategory ? getSkillsByCategory(selectedCategory) : [];

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {t('categories.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('categories.subtitle').replace('{count}', categories.length.toString())}
          </Typography>
        </Box>

        {/* Categories Grid */}
        {!selectedCategory ? (
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
            {categories.map((category) => {
              const skillCount = getSkillsByCategory(category).length;
              return (
                <Card
                  key={category}
                  sx={{
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardActionArea onClick={() => setSelectedCategory(category)}>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            color: categoryColors[category] || '#6366f1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: `${categoryColors[category] || '#6366f1'}20`,
                          }}
                        >
                          {categoryIcons[category] || <CategoryIcon fontSize="large" />}
                        </Box>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{ fontWeight: 600, textAlign: 'center' }}
                        >
                          {category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                          {t('categories.skillCount').replace('{count}', skillCount.toString())}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        ) : (
          /* Selected Category View */
          <Box>
            {/* Back Button */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => setSelectedCategory(null)}
              >
                {t('categories.backToAll')}
              </Typography>
            </Box>

            {/* Category Header */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  color: categoryColors[selectedCategory] || '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: `${categoryColors[selectedCategory] || '#6366f1'}20`,
                }}
              >
                {categoryIcons[selectedCategory] || <CategoryIcon fontSize="large" />}
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                  }}
                >
                  {selectedCategory}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('categories.inCategory').replace('{count}', categorySkills.length.toString())}
                </Typography>
              </Box>
            </Box>

            {/* Skills Grid */}
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
              {categorySkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
