'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const InteractiveHero: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Scroll animation setup
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // Smooth spring animation for mouse movement
  const mouseX = useSpring(mousePosition.x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 100, damping: 20 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Gradient that follows mouse
  const gradientX = useTransform(mouseX, [-0.5, 0.5], [30, 70]);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], [30, 70]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '35vh', md: '42.5vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #FFFBF5 0%, #FFF5F7 100%)',
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 133, 166, 0.15)'
                : 'rgba(255, 107, 157, 0.1)'
            } 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 196, 109, 0.1)'
                : 'rgba(255, 184, 77, 0.15)'
            } 0%, transparent 70%)`,
            top: '10%',
            right: '10%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${
              theme.palette.mode === 'dark'
                ? 'rgba(255, 133, 166, 0.15)'
                : 'rgba(255, 107, 157, 0.2)'
            } 0%, transparent 70%)`,
            bottom: '20%',
            left: '10%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              px: { xs: 2, md: 4 },
            }}
          >
            {/* Main heading with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                style={{
                  rotateX: useTransform(mouseY, [-0.5, 0.5], [5, -5]),
                  rotateY: useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem', lg: '7rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #fff 0%, #ffd6e3 100%)'
                      : 'linear-gradient(135deg, #FF6B9D 0%, #FFB84D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: theme.palette.mode === 'dark'
                      ? '0 0 40px rgba(255, 107, 157, 0.3)'
                      : 'none',
                  }}
                >
                  ClaudeHub
                </Typography>
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' },
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 2,
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                {t('home.subtitle')}
              </Typography>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  fontWeight: 400,
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                  opacity: 0.8,
                }}
              >
                Explore powerful AI skills designed to enhance your productivity
              </Typography>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Box
                  sx={{
                    width: '30px',
                    height: '50px',
                    border: `2px solid ${theme.palette.text.secondary}`,
                    borderRadius: '20px',
                    position: 'relative',
                    opacity: 0.5,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '8px',
                      borderRadius: '2px',
                      backgroundColor: theme.palette.text.secondary,
                    }}
                  />
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};
