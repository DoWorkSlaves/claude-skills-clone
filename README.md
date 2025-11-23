# ClaudeHub

A modern, responsive AI skills hub inspired by claudeskills.info, built with NextJS, Material UI, and design tokens.

## Features

- **NextJS 16** with App Router and TypeScript
- **Material UI (MUI)** for component library
- **Design Tokens** - Centralized design system for consistent styling
- **Responsive Design** - Optimized layouts for mobile, tablet, and desktop
- **Dark/Light Mode** - Theme switching with persistent user preference
- **Modern Architecture** - Component-based structure with TypeScript

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: Material UI (MUI) v6
- **Styling**: Emotion (CSS-in-JS) + Tailwind CSS
- **Language**: TypeScript
- **Icons**: Material UI Icons

## Design System

The project implements a comprehensive design token system located in `src/theme/tokens.ts`:

- **Colors**: Light and dark mode palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Breakpoints**: Responsive breakpoints for mobile (0-599px), tablet (600-1023px), desktop (1024-1439px), and wide (1440px+)
- **Borders**: Border radius values
- **Shadows**: Shadow system
- **Transitions**: Animation timing values

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with featured and latest skills
│   ├── dashboard/         # Dashboard page
│   ├── explore/           # Explore page
│   ├── skills/            # Skills listing page
│   ├── categories/        # Categories page
│   └── submit/            # Submit skill page
├── components/
│   ├── Layout/
│   │   └── Header.tsx     # Responsive navigation header
│   └── SkillCard/
│       └── SkillCard.tsx  # Skill card component with responsive design
├── contexts/
│   └── ThemeContext.tsx   # Theme provider with dark/light mode
├── theme/
│   ├── tokens.ts          # Design token definitions
│   └── theme.ts           # Material UI theme configuration
└── data/
    └── mockSkills.ts      # Mock data for skills
```

## Responsive Design

The application adapts to different screen sizes:

- **Mobile** (< 600px): Single column layout, mobile-optimized navigation
- **Tablet** (600-1023px): 2-column grid for skill cards
- **Desktop** (1024-1439px): 3-column grid for featured skills
- **Wide** (1440px+): 4-column grid for latest skills

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- **Home** (`/`) - Featured and latest skills with grid layout
- **Dashboard** (`/dashboard`) - Personal dashboard (placeholder)
- **Explore** (`/explore`) - Discover skills (placeholder)
- **Skills** (`/skills`) - Browse all skills (placeholder)
- **Categories** (`/categories`) - Browse by category (placeholder)
- **Submit** (`/submit`) - Submit a new skill (placeholder)

## Theme Customization

The theme can be customized by modifying:

1. **Design Tokens**: Edit `src/theme/tokens.ts` to change colors, spacing, typography, etc.
2. **Material UI Theme**: Edit `src/theme/theme.ts` to customize component styles
3. **Theme Context**: The theme mode (light/dark) is persisted in localStorage

## Next Steps

To further develop this project:

1. Implement skill detail pages
2. Add search functionality
3. Implement category filtering
4. Add user authentication
5. Connect to a backend API
6. Implement skill submission form
7. Add pagination for skills listing
8. Implement skill favorites/bookmarks

## License

MIT
