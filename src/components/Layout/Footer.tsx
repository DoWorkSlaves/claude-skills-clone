'use client';

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Divider, useTheme } from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Skills', href: '/skills' },
        { label: 'Categories', href: '/categories' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: 'https://docs.anthropic.com' },
        { label: 'GitHub', href: 'https://github.com/anthropics/skills' },
        { label: 'Community', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: 'https://github.com/anthropics', label: 'GitHub' },
    { icon: <TwitterIcon />, href: 'https://twitter.com/anthropicai', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/anthropic', label: 'LinkedIn' },
    { icon: <EmailIcon />, href: 'mailto:contact@anthropic.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: { xs: 6, md: 8 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
          : 'linear-gradient(180deg, #FFFBF5 0%, #FFF5F7 100%)',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Brand Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #FF6B9D 0%, #FFB84D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ClaudeHub
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              A curated collection of AI-powered skills for Claude Code. Enhance your productivity
              with community-driven solutions.
            </Typography>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social) => (
                <MuiLink
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {social.icon}
                </MuiLink>
              ))}
            </Box>
          </Box>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Box key={section.title}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      color: theme.palette.text.secondary,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ClaudeHub. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink
              href="#"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="#"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
