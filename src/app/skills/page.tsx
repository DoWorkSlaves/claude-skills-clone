'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material';
import {
  GridView as GridIcon,
  ViewList as ListIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Header } from '@/components/Layout/Header';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { skills, getAllCategories } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

type SortOption = 'name' | 'downloads' | 'category';
type ViewMode = 'grid' | 'list';

export default function SkillsPage() {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<SortOption>('downloads');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  const filteredSkills = skills.filter((skill) =>
    selectedCategory === null || skill.categories.includes(selectedCategory)
  );

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'downloads':
        return (b.downloads || 0) - (a.downloads || 0);
      case 'category':
        return a.categories[0].localeCompare(b.categories[0]);
      default:
        return 0;
    }
  });

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
            {t('skills.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('skills.subtitle').replace('{count}', skills.length.toString())}
          </Typography>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Sort Options */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('skills.sortBy')}
            </Typography>
            <ToggleButtonGroup
              value={sortBy}
              exclusive
              onChange={(e, newSort) => newSort && setSortBy(newSort)}
              size="small"
            >
              <ToggleButton value="downloads">{t('skills.mostPopular')}</ToggleButton>
              <ToggleButton value="name">{t('skills.name')}</ToggleButton>
              <ToggleButton value="category">{t('skills.category')}</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* View Mode */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('skills.view')}
            </Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newView) => newView && setViewMode(newView)}
              size="small"
            >
              <ToggleButton value="grid">
                <GridIcon />
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t('skills.filterByCategory')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Chip
              label={t('explore.all')}
              onClick={() => setSelectedCategory(null)}
              color={selectedCategory === null ? 'primary' : 'default'}
              sx={{
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.2s',
              }}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Featured Skills Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <StarIcon sx={{ color: '#f59e0b' }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              {t('skills.featuredSkills')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: viewMode === 'grid' ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                md: viewMode === 'grid' ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
                lg: viewMode === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)',
              },
              gap: { xs: 2, sm: 3, md: 4 },
              mb: 6,
            }}
          >
            {sortedSkills
              .filter((skill) => skill.featured)
              .map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
          </Box>
        </Box>

        {/* Results Count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
            {t('skills.allSkills')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('skills.showing')} {t('skills.skillCount').replace('{count}', sortedSkills.length.toString())}
            {selectedCategory && ` ${t('explore.in')} ${selectedCategory}`}
          </Typography>
        </Box>

        {/* Skills Grid/List */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: viewMode === 'grid' ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
              md: viewMode === 'grid' ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
              lg: viewMode === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {sortedSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </Box>
      </Container>
    </>
  );
}
