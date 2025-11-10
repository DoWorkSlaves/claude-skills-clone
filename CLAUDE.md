# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 front-end clone of claudeskills.info - a skills hub application built with TypeScript, Material UI, and a centralized design token system. The application features responsive layouts, dark/light mode theming, and a component-based architecture.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm start` - Start production server (requires build first)

### Development Workflow
- The dev server supports hot reload for rapid iteration
- TypeScript errors will appear in the terminal and browser console
- ESLint configuration uses Next.js recommended settings

## Architecture

### Design Token System
The application uses a centralized design token architecture located in `src/theme/`:

- **`tokens.ts`** - Single source of truth for all design values (colors, typography, spacing, breakpoints, shadows, etc.)
- **`theme.ts`** - Converts design tokens into Material UI theme configuration
- Both light and dark themes are generated from the same token structure

When modifying styles:
1. First check if a design token exists in `src/theme/tokens.ts`
2. Use design tokens instead of hardcoded values
3. For Material UI components, prefer using `theme.spacing()`, `theme.palette`, and `theme.breakpoints` from the hook
4. Only add new tokens if the value will be reused across components

### Theme System
- **Context**: `src/contexts/ThemeContext.tsx` manages theme state
- **Persistence**: Theme preference is saved to localStorage as 'theme-mode'
- **System Detection**: Falls back to `prefers-color-scheme` media query if no saved preference
- **Access**: Use `useThemeContext()` hook to access theme mode and `toggleTheme()` function
- **Provider**: `ThemeProvider` wraps the entire app in `src/app/layout.tsx`

### Responsive Design
The application uses Material UI's breakpoint system (mapped to design tokens):

- **xs (mobile)**: 0-599px
- **sm (tablet)**: 600-1023px
- **md (desktop)**: 1024-1439px
- **lg (wide)**: 1440px+

Use `useMediaQuery(theme.breakpoints.down('sm'))` for responsive logic in components.

### Data Layer
Currently uses mock data from `src/data/mockSkills.ts`. The `SkillData` interface is defined in `src/components/SkillCard/SkillCard.tsx` and represents the core data model for skills.

### Component Structure
- Components use TypeScript with explicit interface definitions
- Most components are client components (`'use client'` directive) due to Material UI requirements
- Components follow a pattern of: imports → interface → component → export
- Material UI components are used for UI elements with custom styling via `sx` prop

### Path Aliases
The project uses TypeScript path alias `@/*` which maps to `./src/*`. Always use this alias for imports:
- Good: `import { designTokens } from '@/theme/tokens'`
- Bad: `import { designTokens } from '../theme/tokens'`

## Key Files

- `src/app/layout.tsx` - Root layout with ThemeProvider wrapper
- `src/app/page.tsx` - Home page with featured and latest skills sections
- `src/components/SkillCard/SkillCard.tsx` - Reusable skill card component with responsive design
- `src/components/Layout/Header.tsx` - Navigation header
- `src/theme/tokens.ts` - Design token definitions
- `src/theme/theme.ts` - Material UI theme configuration
- `src/contexts/ThemeContext.tsx` - Theme mode context and provider

## Working with Styles

### Material UI Styling Approach
This project uses Emotion (CSS-in-JS) via Material UI's `sx` prop for component styling. When styling:

1. Use the `sx` prop for component-specific styles
2. Reference theme values via the theme object: `theme.palette.primary.main`, `theme.spacing(2)`, etc.
3. For hover/focus states, use pseudo-selectors in `sx`: `'&:hover': { ... }`
4. Access design tokens directly when not using Material UI components

### Example
```tsx
<Box sx={{
  padding: theme.spacing(2),           // Use theme spacing
  backgroundColor: theme.palette.background.paper,
  borderRadius: designTokens.borderRadius.lg,  // Or design tokens directly
  transition: `all ${designTokens.transitions.normal}`,
}}>
```

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Path alias `@/*` configured for clean imports
- JSX mode: react-jsx (React 19)
- Module resolution: bundler

## Common Patterns

### Creating New Pages
1. Create route folder in `src/app/[route-name]/`
2. Add `page.tsx` with default export function
3. Pages should import and use existing layout components (Header, etc.)
4. Use `'use client'` directive if using hooks or interactive features

### Adding New Components
1. Create component folder in `src/components/[ComponentName]/`
2. Add `[ComponentName].tsx` with interface definition
3. Export component for reuse
4. Use TypeScript interfaces for props
5. Access theme via `useTheme()` hook for responsive behavior

### Working with Forms/Interactions
Material UI provides pre-built components (Button, TextField, etc.) that automatically use the theme. Prefer these over custom implementations for consistency.
