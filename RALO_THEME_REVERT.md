# 랄로 (Ralo) Theme - Revert Guide

## Current Theme: 랄로 Streamer Identity

### Applied Changes:
1. **Logo**: Sunglasses-themed logo with green accents and "RALO" text
2. **Colors**:
   - Primary: Green (#22c55e) - from "Greenday" nickname
   - Secondary: Lime green (#84cc16)
   - Dark backgrounds (#0a0a0a, #1a1a1a) - moody streaming aesthetic
   - Animated streaming indicator

## How to Revert to Original Theme

### Method 1: Using Backup Files (Recommended)

```bash
# Revert logo
cp public/logo.svg.backup public/logo.svg

# Revert theme colors
cp src/theme/tokens.ts.backup src/theme/tokens.ts
```

### Method 2: Manual Revert

If backup files are not available, restore the original pink/orange gradient theme:

#### Logo (public/logo.svg)
The original logo is a complex path-based design. Check `public/logo.svg.backup` for the full SVG.

#### Theme Colors (src/theme/tokens.ts)

**Original Light Mode:**
- primary: "#FF6B9D" (Pink)
- secondary: "#FFB84D" (Orange)
- background: "#FFFBF5" (Cream)

**Original Dark Mode:**
- primary: "#FF85A6" (Light Pink)
- secondary: "#FFC46D" (Light Orange)
- background: "#2D3436" (Dark Gray)

## 랄로 Theme Details

### Brand Identity Elements:
- **Signature**: Sports sunglasses (Oakley) - never takes them off on stream
- **Nickname**: "Greenday" (explains green color choice)
- **Aesthetic**: Dark, moody lighting with authentic/casual vibe
- **Content**: Gaming/streaming (PUBG, etc.)
- **Subscribers**: 1M+ on YouTube

### Visual Design:
- Sunglasses icon as logo centerpiece
- Green color scheme (#22c55e primary, #84cc16 secondary)
- Very dark backgrounds (#0a0a0a) for moody streaming feel
- Animated red "live" indicator dot
- Gaming/streaming-focused brand identity

## Quick Revert Command

```bash
# One-liner to revert everything
cp public/logo.svg.backup public/logo.svg && cp src/theme/tokens.ts.backup src/theme/tokens.ts
```

---
**Note**: The dev server will auto-reload after reverting files.
