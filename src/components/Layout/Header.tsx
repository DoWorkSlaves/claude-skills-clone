'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { searchSkills } from '@/data/skills';

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const searchResults = searchQuery.length >= 2 ? searchSkills(searchQuery) : [];

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOut();
    handleUserMenuClose();
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                mr: 4,
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Ralo Skills"
                sx={{
                  height: 40,
                  width: 'auto',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Ralo Skills
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                <Button component={Link} href="/" color="inherit">
                  {t('header.home')}
                </Button>
                <Button component={Link} href="/explore" color="inherit">
                  {t('header.explore')}
                </Button>
                <Button component={Link} href="/skills" color="inherit">
                  {t('header.skills')}
                </Button>
                <Button component={Link} href="/categories" color="inherit">
                  {t('header.categories')}
                </Button>
                <Button component={Link} href="/submit" color="inherit">
                  {t('header.submit')}
                </Button>
              </Box>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <Box sx={{ flexGrow: 1 }}>
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              </Box>
            )}

            {/* Search, Language, Auth, and Theme Toggle */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
              <Button
                color="inherit"
                onClick={toggleLanguage}
                startIcon={<LanguageIcon />}
                sx={{ minWidth: 'auto', px: { xs: 1, sm: 2 } }}
              >
                {language === 'ko' ? 'EN' : 'KO'}
              </Button>

              {/* Auth Section */}
              {typeof window === 'undefined' || loading ? (
                <Box sx={{ width: 40, height: 40 }} /> // Placeholder to prevent layout shift
              ) : user ? (
                <>
                  <IconButton onClick={handleUserMenuOpen} sx={{ p: 0.5 }}>
                    <Avatar
                      src={user.user_metadata?.avatar_url}
                      alt={user.user_metadata?.full_name || user.email || 'User'}
                      sx={{ width: 32, height: 32 }}
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {user.user_metadata?.full_name || 'User'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>
                      <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                      Sign Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleSignIn}
                  sx={{ ml: 1 }}
                >
                  {isMobile ? '' : 'Sign In'}
                </Button>
              )}

              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery('');
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '80vh',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Search Input */}
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
              fullWidth
              autoFocus
              placeholder={t('header.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery('')}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </Box>

          {/* Search Results */}
          <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {searchQuery.length < 2 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {t('header.search.minChars')}
                </Typography>
              </Box>
            ) : searchResults.length > 0 ? (
              <List>
                {searchResults.map((skill) => (
                  <ListItem
                    key={skill.id}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {skill.name}
                          </Typography>
                          {skill.featured && (
                            <Chip label={t('header.search.featured')} size="small" color="primary" />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {skill.description}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {skill.categories.map((cat) => (
                              <Chip key={cat} label={cat} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom>
                  {t('header.search.noResults')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('header.search.tryDifferent')}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
