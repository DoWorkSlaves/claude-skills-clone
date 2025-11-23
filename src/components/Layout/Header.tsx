'use client';

import React, { useState, useEffect } from 'react';
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
  ListItemIcon,
  ListItemButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Drawer,
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
  Home as HomeIcon,
  Explore as ExploreIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { searchSkills } from '@/services/supabase';
import { SkillWithCategory, getLocalizedValue } from '@/types/database';

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();

  // Check if a path is active
  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SkillWithCategory[]>([]);
  const [mobileSearchResults, setMobileSearchResults] = useState<SkillWithCategory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search effect for dialog
  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        const results = await searchSkills(searchQuery, language as 'ko' | 'en');
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, language]);

  // Search effect for mobile drawer
  useEffect(() => {
    if (mobileSearchQuery.length >= 2) {
      const timer = setTimeout(async () => {
        const results = await searchSkills(mobileSearchQuery, language as 'ko' | 'en');
        setMobileSearchResults(results);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setMobileSearchResults([]);
    }
  }, [mobileSearchQuery, language]);

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
    setMobileDrawerOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    handleUserMenuClose();
    setMobileDrawerOpen(false);
  };

  const handleMobileNavClick = () => {
    setMobileDrawerOpen(false);
    setMobileSearchQuery('');
  };

  const navigationItems = [
    { label: t('header.home'), href: '/', icon: <HomeIcon /> },
    { label: t('header.skills'), href: '/skills', icon: <ExploreIcon /> },
    { label: t('header.categories'), href: '/categories', icon: <CategoryIcon /> },
  ];

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
                mr: { xs: 'auto', sm: 4 },
              }}
            >
              <Box
                component="img"
                src="/new_logo.svg"
                alt="ClaudeHub"
                sx={{
                  height: { xs: 32, sm: 40 },
                  width: 'auto',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: { xs: 16, sm: 18 },
                    fontWeight: 200,
                    color: mode === 'dark' ? '#ffffff' : '#000000',
                    lineHeight: 1.2,
                  }}
                >
                  Claude
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: { xs: 16, sm: 18 },
                    fontWeight: 800,
                    color: mode === 'dark' ? '#ffffff' : '#000000',
                    lineHeight: 1.2,
                  }}
                >
                  Hub
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                <Button
                  component={Link}
                  href="/"
                  color="inherit"
                  sx={{
                    fontWeight: isActivePath('/') ? 700 : 400,
                    borderBottom: isActivePath('/') ? `2px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: 0,
                    pb: 0.5,
                  }}
                >
                  {t('header.home')}
                </Button>
                <Button
                  component={Link}
                  href="/skills"
                  color="inherit"
                  sx={{
                    fontWeight: isActivePath('/skills') ? 700 : 400,
                    borderBottom: isActivePath('/skills') ? `2px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: 0,
                    pb: 0.5,
                  }}
                >
                  {t('header.skills')}
                </Button>
                <Button
                  component={Link}
                  href="/categories"
                  color="inherit"
                  sx={{
                    fontWeight: isActivePath('/categories') ? 700 : 400,
                    borderBottom: isActivePath('/categories') ? `2px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: 0,
                    pb: 0.5,
                  }}
                >
                  {t('header.categories')}
                </Button>
              </Box>
            )}

            {/* Desktop: Search, Language, Auth, and Theme Toggle */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <Button
                  color="inherit"
                  onClick={toggleLanguage}
                  startIcon={<LanguageIcon />}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  {language === 'ko' ? 'EN' : 'KO'}
                </Button>

                {/* Auth Section */}
                {typeof window === 'undefined' || loading ? (
                  <Box sx={{ width: 40, height: 40 }} />
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
                    Sign In
                  </Button>
                )}

                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
            )}

            {/* Mobile: Search and Hamburger buttons only */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => setMobileDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => {
          setMobileDrawerOpen(false);
          setMobileSearchQuery('');
        }}
        PaperProps={{
          sx: {
            width: '85%',
            maxWidth: 360,
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={() => {
              setMobileDrawerOpen(false);
              setMobileSearchQuery('');
            }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Search Bar in Drawer */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('header.search.placeholder')}
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: mobileSearchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setMobileSearchQuery('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Mobile Search Results */}
          {mobileSearchQuery.length >= 2 && (
            <Box sx={{ maxHeight: 200, overflow: 'auto', px: 2, pb: 2 }}>
              {mobileSearchResults.length > 0 ? (
                <List dense>
                  {mobileSearchResults.slice(0, 5).map((skill) => {
                    const title = getLocalizedValue(skill.title_ko, skill.title_en, language as 'ko' | 'en');
                    const categoryName = skill.category
                      ? getLocalizedValue(skill.category.category_name_ko, skill.category.category_name_en, language as 'ko' | 'en')
                      : '';

                    return (
                      <ListItem
                        key={skill.id}
                        disablePadding
                        onClick={handleMobileNavClick}
                      >
                        <ListItemButton component={Link} href={`/skill/${skill.id}`}>
                          <ListItemText
                            primary={title}
                            secondary={categoryName}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  {t('header.search.noResults')}
                </Typography>
              )}
            </Box>
          )}

          <Divider />

          {/* Navigation Links */}
          <List sx={{ flexGrow: 1 }}>
            {navigationItems.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={handleMobileNavClick}
                    sx={{
                      bgcolor: isActive ? `${theme.palette.primary.main}15` : 'transparent',
                      borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                      '&:hover': {
                        bgcolor: isActive ? `${theme.palette.primary.main}20` : 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? theme.palette.primary.main : 'inherit',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider />

          {/* Settings Section */}
          <Box sx={{ p: 2 }}>
            {/* Language Toggle */}
            <ListItemButton onClick={toggleLanguage} sx={{ borderRadius: 1, mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={language === 'ko' ? 'English' : '한국어'} />
            </ListItemButton>

            {/* Theme Toggle */}
            <ListItemButton onClick={toggleTheme} sx={{ borderRadius: 1, mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
            </ListItemButton>

            {/* Auth Button */}
            {typeof window !== 'undefined' && !loading && (
              user ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 1 }}>
                    <Avatar
                      src={user.user_metadata?.avatar_url}
                      alt={user.user_metadata?.full_name || user.email || 'User'}
                      sx={{ width: 36, height: 36 }}
                    >
                      {user.email?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user.user_metadata?.full_name || 'User'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Box>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              )
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Search Dialog (for both mobile and desktop) */}
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
            ) : isSearching ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : searchResults.length > 0 ? (
              <List>
                {searchResults.map((skill) => {
                  const title = getLocalizedValue(skill.title_ko, skill.title_en, language as 'ko' | 'en');
                  const description = getLocalizedValue(skill.sub_title_ko, skill.sub_title_en, language as 'ko' | 'en');
                  const categoryName = skill.category
                    ? getLocalizedValue(skill.category.category_name_ko, skill.category.category_name_en, language as 'ko' | 'en')
                    : '';

                  return (
                    <ListItem
                      key={skill.id}
                      component={Link}
                      href={`/skill/${skill.id}`}
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit',
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
                              {title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {description}
                            </Typography>
                            {categoryName && (
                              <Chip label={categoryName} size="small" variant="outlined" />
                            )}
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
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
