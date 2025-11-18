'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SkillData {
  id: string;
  name: string;
  description: string;
  categories: string[];
  downloads?: number;
  icon?: string;
  featured?: boolean;
  author: string;
  license: string;
  stars: number;
  forks: number;
  repository?: string;
  tags?: string[];
  installCommand?: string;
}

interface SkillCardProps {
  skill: SkillData;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Dev: '#3b82f6',
      Creative: '#8b5cf6',
      Design: '#ec4899',
      Productivity: '#10b981',
      Communication: '#f59e0b',
      Office: '#6366f1',
    };
    return colors[category] || theme.palette.primary.main;
  };

  return (
    <Link href={`/skill/${skill.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                mr: 2,
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
              }}
            >
              {skill.icon || skill.name.charAt(0)}
            </Avatar>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="h3"
              sx={{ fontWeight: 600 }}
            >
              {skill.name}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {skill.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skill.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                sx={{
                  bgcolor: getCategoryColor(category) + '20',
                  color: getCategoryColor(category),
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
            <Typography variant="caption" color="text.secondary">
              {skill.stars.toLocaleString()} {t('skillDetail.stars')}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Link>
  );
};
