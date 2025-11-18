'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { getSkillsByCategory, getAllCategories } from '@/data/skills';

export const CategorySections: React.FC = () => {
  const categories = getAllCategories();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      {categories.map((category, categoryIndex) => {
        const categorySkills = getSkillsByCategory(category).slice(0, 4);

        // Skip if no skills in this category
        if (categorySkills.length === 0) return null;

        return (
          <Box key={category} sx={{ mb: { xs: 6, md: 8 } }}>
            {/* Category Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #FFB84D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {category}
              </Typography>
            </motion.div>

            {/* Skill Cards Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};
