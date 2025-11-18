'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const InteractiveHero: React.FC = () => {
  const theme = useTheme();
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Check if we should show 랄로 theme (Korean + Dark mode only)
  const showRaloTheme = language === 'ko' && theme.palette.mode === 'dark';

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

        {/* Conditional: 랄로 GIFs (Korean + Dark Mode) OR Gradient Orbs (Default) */}
        {showRaloTheme ? (
          <>
            {/* GIF 1 - Top Right - Eating/Looking - DRAGGABLE */}
            <motion.img
              src="/1.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, 20, 0],
                y: [0, -25, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '200px',
                height: 'auto',
                top: '5%',
                right: '3%',
                opacity: 0.65,
                pointerEvents: 'auto',
                borderRadius: '16px',
                filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.4))',
                cursor: 'grab',
              }}
            />

            {/* GIF 2 - Top Left - "성공의 반대는?" with text - DRAGGABLE */}
            <motion.img
              src="/2.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, -20, 0],
                y: [0, -15, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '220px',
                height: 'auto',
                top: '8%',
                left: '2%',
                opacity: 0.7,
                pointerEvents: 'auto',
                borderRadius: '16px',
                filter: 'drop-shadow(0 0 35px rgba(34, 197, 94, 0.45))',
                cursor: 'grab',
              }}
            />

            {/* GIF 3 - Middle Left - "웃어라" Smile - DRAGGABLE */}
            <motion.img
              src="/3.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, -15, 0],
                y: [0, 20, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '180px',
                height: 'auto',
                top: '45%',
                left: '5%',
                opacity: 0.6,
                pointerEvents: 'auto',
                borderRadius: '14px',
                filter: 'drop-shadow(0 0 25px rgba(34, 197, 94, 0.35))',
                cursor: 'grab',
              }}
            />

            {/* GIF 4 - Bottom Left - Shocked expression (small) - DRAGGABLE */}
            <motion.img
              src="/4.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, -18, 0],
                y: [0, 22, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '130px',
                height: 'auto',
                bottom: '8%',
                left: '8%',
                opacity: 0.55,
                pointerEvents: 'auto',
                borderRadius: '12px',
                filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))',
                cursor: 'grab',
              }}
            />

            {/* GIF 5 - Middle Right - Headbanging/Nodding - DRAGGABLE */}
            <motion.img
              src="/5.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, 18, 0],
                y: [0, -18, 0],
                rotate: [0, 4, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '150px',
                height: 'auto',
                top: '50%',
                right: '6%',
                opacity: 0.6,
                pointerEvents: 'auto',
                borderRadius: '13px',
                filter: 'drop-shadow(0 0 22px rgba(34, 197, 94, 0.32))',
                cursor: 'grab',
              }}
            />

            {/* GIF 6 - Bottom Right - Checkered shirt - DRAGGABLE */}
            <motion.img
              src="/6.gif"
              alt="랄로"
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05, cursor: 'grab' }}
              animate={{
                x: [0, 15, 0],
                y: [0, 20, 0],
                scale: [1, 0.97, 1],
              }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: '170px',
                height: 'auto',
                bottom: '12%',
                right: '4%',
                opacity: 0.65,
                pointerEvents: 'auto',
                borderRadius: '14px',
                filter: 'drop-shadow(0 0 28px rgba(34, 197, 94, 0.38))',
                cursor: 'grab',
              }}
            />
          </>
        ) : (
          <>
            {/* Default Gradient Orbs */}
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
          </>
        )}

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
                    background: showRaloTheme
                      ? 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)'
                      : theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #fff 0%, #ffd6e3 100%)'
                      : 'linear-gradient(135deg, #FF6B9D 0%, #FFB84D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: showRaloTheme
                      ? '0 0 40px rgba(34, 197, 94, 0.5)'
                      : theme.palette.mode === 'dark'
                      ? '0 0 40px rgba(255, 107, 157, 0.3)'
                      : 'none',
                  }}
                >
                  {showRaloTheme ? '랄로 스킬' : 'Ralo Skills'}
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
