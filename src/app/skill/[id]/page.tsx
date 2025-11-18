'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Chip,
  Button,
  Container,
  Paper,
  useTheme,
  Skeleton,
  IconButton,
  Rating,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ScrollToTopFab } from '@/components/Layout/ScrollToTopFab';
import { SkillCard } from '@/components/SkillCard/SkillCard';
import { CommentSection } from '@/components/Comments/CommentSection';
import { githubService, type GitHubRepoStats } from '@/services/githubService';

export default function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  // Find the skill by id
  const skill = skills.find((s) => s.id === id);

  // State for GitHub stats
  const [githubStats, setGithubStats] = useState<GitHubRepoStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // State for reactions
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // Fetch GitHub stats on mount
  useEffect(() => {
    if (skill?.repository) {
      setIsLoadingStats(true);
      githubService
        .fetchRepoStats(skill.repository)
        .then((stats) => {
          setGithubStats(stats);
        })
        .catch((err) => {
          console.error('Failed to fetch GitHub stats:', err);
        })
        .finally(() => {
          setIsLoadingStats(false);
        });
    }
  }, [skill?.repository]);

  if (!skill) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4">{t('skillDetail.notFound')}</Typography>
          <Button onClick={() => router.push('/skills')} sx={{ mt: 2 }}>
            {t('skillDetail.backToSkills')}
          </Button>
        </Container>
      </>
    );
  }

  // Get 3 random skills (excluding current)
  const randomSkills = skills
    .filter((s) => s.id !== skill.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const handleCopyInstall = () => {
    if (skill.installCommand) {
      navigator.clipboard.writeText(skill.installCommand);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: skill.name,
        text: skill.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Mock data for ratings and reviews (in a real app, this would come from backend)
  const averageRating = 4.5;
  const totalReviews = 127;

  return (
    <>
      {/* 1. Header */}
      <Header />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* 2. Icon and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Box
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontWeight: 'bold',
                color: 'white',
                boxShadow: theme.shadows[8],
              }}
            >
              {skill.icon || skill.name.charAt(0)}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  mb: 1,
                }}
              >
                {skill.name}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* 3. License, Git, Owner, Download, Share buttons */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flex: 1 }}>
            <Chip label={`License: ${githubStats?.license ?? skill.license}`} variant="outlined" />
            <Chip label={`Owner: ${skill.author}`} variant="outlined" />
            {isLoadingStats ? (
              <Skeleton variant="rectangular" width={100} height={32} />
            ) : (
              <Chip
                icon={<StarIcon />}
                label={`${(githubStats?.stars ?? skill.stars).toLocaleString()} stars`}
                color="warning"
                variant="outlined"
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {skill.installCommand && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleCopyInstall}
                size="large"
              >
                {t('skillDetail.install')}
              </Button>
            )}
            {skill.repository && (
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href={skill.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('skillDetail.github')}
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              {t('skillDetail.share')}
            </Button>
          </Box>
        </Paper>

        {/* 4. Categories, Subtitle, Tags, Ratings, Reviews */}
        <Box sx={{ mb: 4 }}>
          {/* Categories */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {skill.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>

          {/* Subtitle/Description */}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.7 }}
          >
            {skill.description}
          </Typography>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {skill.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          )}

          {/* Ratings and Reviews */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Rating value={averageRating} precision={0.5} readOnly size="large" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({totalReviews} {t('skillDetail.reviews')})
            </Typography>
          </Box>
        </Box>

        {/* 5. Main Contents Introduction Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: theme.palette.background.default }}>
          {skill.whatIsIt && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('skillDetail.whatIsIt.title')}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.text.secondary }}>
                {skill.whatIsIt}
              </Typography>
            </Box>
          )}

          {skill.howToUse && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('skillDetail.howToUse.title')}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.text.secondary }}>
                {skill.howToUse}
              </Typography>
            </Box>
          )}

          {skill.keyFeatures && skill.keyFeatures.length > 0 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('skillDetail.keyFeatures.title')}
              </Typography>
              <Box component="ul" sx={{ pl: 3, '& li': { mb: 1.5 } }}>
                {skill.keyFeatures.map((feature, index) => (
                  <Typography
                    component="li"
                    key={index}
                    variant="body1"
                    sx={{ lineHeight: 1.8, color: theme.palette.text.secondary }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {/* 6. Quick Reaction Area */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={() => {
                setLiked(!liked);
                if (disliked) setDisliked(false);
              }}
              color={liked ? 'primary' : 'default'}
              size="large"
            >
              <ThumbUpIcon fontSize="large" />
            </IconButton>
            <Typography variant="caption" display="block">
              {t('skillDetail.helpful')}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={() => {
                setDisliked(!disliked);
                if (liked) setLiked(false);
              }}
              color={disliked ? 'error' : 'default'}
              size="large"
            >
              <ThumbDownIcon fontSize="large" />
            </IconButton>
            <Typography variant="caption" display="block">
              {t('skillDetail.notHelpful')}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={() => setFavorited(!favorited)}
              color={favorited ? 'error' : 'default'}
              size="large"
            >
              {favorited ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
            </IconButton>
            <Typography variant="caption" display="block">
              {t('skillDetail.addToFavorites')}
            </Typography>
          </Box>
        </Paper>

        {/* 7. Comments */}
        <CommentSection skillId={skill.id} />
      </Container>

      {/* 8. Discover Message */}
      <Box
        sx={{
          width: '100%',
          py: { xs: 3, md: 4 },
          my: { xs: 4, md: 6 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, rgba(255, 107, 157, 0.1) 0%, rgba(255, 184, 77, 0.1) 100%)'
            : 'linear-gradient(90deg, rgba(255, 107, 157, 0.05) 0%, rgba(255, 184, 77, 0.05) 100%)',
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              fontWeight: 600,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FFB84D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('discover.moreSkills.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            {t('discover.moreSkills.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* 9. Three Random Skill Cards */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {randomSkills.map((randomSkill, index) => (
            <motion.div
              key={randomSkill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard skill={randomSkill} />
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* 10. Footer */}
      <Footer />

      {/* 11. FAB */}
      <ScrollToTopFab />
    </>
  );
}
