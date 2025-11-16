'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Chip,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  useTheme,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Star as StarIcon,
  ForkRight as ForkIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { skills } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Layout/Header';
import { SkillCard } from '@/components/SkillCard/SkillCard';

export default function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  // Find the skill by id
  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    return (
      <>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            mt: 8,
          }}
        >
          <Typography variant="h4">{t('skillDetail.notFound')}</Typography>
          <Button onClick={() => router.push('/skills')} sx={{ mt: 2 }}>
            {t('skillDetail.backToSkills')}
          </Button>
        </Box>
      </>
    );
  }

  // Get related skills (same category, excluding current)
  const relatedSkills = skills
    .filter(
      (s) =>
        s.id !== skill.id &&
        s.categories.some((cat) => skill.categories.includes(cat))
    )
    .slice(0, 3);

  const handleCopyInstall = () => {
    if (skill.installCommand) {
      navigator.clipboard.writeText(skill.installCommand);
    }
  };

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          mt: 8,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <MuiLink
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            {t('header.home')}
          </MuiLink>
          <MuiLink color="inherit" href="/skills" sx={{ textDecoration: 'none' }}>
            {t('header.skills')}
          </MuiLink>
          <Typography color="text.primary">{skill.name}</Typography>
        </Breadcrumbs>

        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {skill.icon || skill.name.charAt(0)}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" gutterBottom>
                {skill.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {skill.description}
              </Typography>
            </Box>
          </Box>

          {/* Categories and Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {skill.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color="primary"
                variant="filled"
              />
            ))}
            {skill.tags?.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" size="small" />
            ))}
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 20, color: theme.palette.warning.main }} />
              <Typography variant="body2">
                {skill.stars.toLocaleString()} {t('skillDetail.stars')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ForkIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2">
                {skill.forks.toLocaleString()} {t('skillDetail.forks')}
              </Typography>
            </Box>
            {skill.downloads && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DownloadIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  {skill.downloads.toLocaleString()} {t('home.downloads')}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Install Command */}
          {skill.installCommand && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="body2"
                component="code"
                sx={{ fontFamily: 'monospace' }}
              >
                {skill.installCommand}
              </Typography>
              <Button
                size="small"
                startIcon={<CopyIcon />}
                onClick={handleCopyInstall}
              >
                {t('skillDetail.copy')}
              </Button>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Content Sections */}
        <Box sx={{ mb: 4 }}>
          {skill.whatIsIt && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                {t('skillDetail.whatIsIt')}
              </Typography>
              <Typography variant="body1" paragraph>
                {skill.whatIsIt}
              </Typography>
            </Box>
          )}

          {skill.howToUse && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                {t('skillDetail.howToUse')}
              </Typography>
              <Typography variant="body1" paragraph>
                {skill.howToUse}
              </Typography>
            </Box>
          )}

          {skill.keyFeatures && skill.keyFeatures.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                {t('skillDetail.keyFeatures')}
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {skill.keyFeatures.map((feature, index) => (
                  <Typography component="li" key={index} variant="body1" sx={{ mb: 1 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Metadata */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t('skillDetail.metadata')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2,
              mt: 2,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('skillDetail.author')}
              </Typography>
              <Typography variant="body1">{skill.author}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('skillDetail.license')}
              </Typography>
              <Typography variant="body1">{skill.license}</Typography>
            </Box>
            {skill.version && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('skillDetail.version')}
                </Typography>
                <Typography variant="body1">{skill.version}</Typography>
              </Box>
            )}
            {skill.lastUpdate && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {t('skillDetail.lastUpdate')}
                </Typography>
                <Typography variant="body1">{skill.lastUpdate}</Typography>
              </Box>
            )}
          </Box>

          {skill.repository && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={skill.repository}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 3 }}
            >
              {t('skillDetail.viewOnGitHub')}
            </Button>
          )}
        </Box>

        {/* Related Skills */}
        {relatedSkills.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Box>
              <Typography variant="h5" gutterBottom>
                {t('skillDetail.relatedSkills')}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: { xs: 2, sm: 3 },
                  mt: 3,
                }}
              >
                {relatedSkills.map((relatedSkill) => (
                  <SkillCard key={relatedSkill.id} skill={relatedSkill} />
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
