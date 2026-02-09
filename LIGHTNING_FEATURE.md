# ⚡ Lightning Effect Feature

## Overview
The lightning effect now follows your mouse cursor and strikes when you click on navigation links, creating an immersive navigation experience.

## Features

✅ **Mouse Tracking**: Lightning follows your cursor as you move it around the page
✅ **Click Strike**: When you click a link, lightning strikes at the cursor position
✅ **Smooth Navigation**: After the strike animation (400ms), the page navigates
✅ **Visual Feedback**: Intense flash effect during strike

## How It Works

### 1. Mouse Following
- The lightning effect tracks your mouse position in real-time
- The lightning bolt follows your cursor smoothly across the screen

### 2. Click Strike
- When you click on a link wrapped with `LightningLink`, a strike animation triggers
- The strike creates an intense flash at the cursor position
- After 400ms, navigation occurs

## Usage

### Replace Regular Links with LightningLink

**Before:**
```tsx
import { Link } from "wouter";

<Link href="/book-demo">Book Demo</Link>
```

**After:**
```tsx
import { LightningLink } from "@/components/LightningLink";

<LightningLink href="/book-demo">Book Demo</LightningLink>
```

### Example: Update Navigation Links

You can now replace `Link` components with `LightningLink` throughout your app:

```tsx
// In Navbar.tsx
import { LightningLink } from "@/components/LightningLink";

<LightningLink href="/book-demo" className="...">
  Book a Demo
</LightningLink>

<LightningLink href="/how-it-works" className="...">
  How it Works
</LightningLink>
```

## Technical Details

### Components Created

1. **`useLightning` Hook** (`hooks/useLightning.ts`)
   - Tracks mouse position
   - Manages strike state and animation
   - Returns lightning state and trigger function

2. **`LightningLink` Component** (`components/LightningLink.tsx`)
   - Wrapper around wouter's `Link`
   - Triggers strike on click
   - Handles navigation timing

3. **`LightningContext`** (`contexts/LightningContext.tsx`)
   - Provides lightning state globally
   - Used by `OdysseyBackground` and `LightningLink`

### Enhanced Lightning Component

The `Lightning` component now accepts:
- `mouseX`, `mouseY`: Normalized mouse position (0-1)
- `isStriking`: Boolean indicating strike state
- `strikeIntensity`: Float (0-1) for strike animation

### Shader Updates

The WebGL shader now:
- Calculates distance from mouse position
- Blends center lightning with mouse-following lightning
- Adds intense flash effect during strikes

## Customization

### Adjust Strike Duration
In `hooks/useLightning.ts`:
```typescript
const duration = 400; // Change this value (in milliseconds)
```

### Adjust Mouse Influence
In `components/Lightning.tsx` shader:
```glsl
float mouseInfluence = 0.3; // Change this (0.0 to 1.0)
```

### Adjust Strike Intensity
In `components/Lightning.tsx` shader:
```glsl
col += strikeColor * strikeFlash * 2.0; // Change multiplier
```

## Files Modified

- ✅ `client/src/hooks/useLightning.ts` (new)
- ✅ `client/src/components/Lightning.tsx` (enhanced)
- ✅ `client/src/components/LightningLink.tsx` (new)
- ✅ `client/src/contexts/LightningContext.tsx` (new)
- ✅ `client/src/components/OdysseyBackground.tsx` (updated)
- ✅ `client/src/App.tsx` (added LightningProvider)

## Next Steps

To enable lightning strikes on all navigation links:

1. Import `LightningLink` where needed
2. Replace `Link` with `LightningLink`
3. Keep all existing props (className, etc.)

The lightning effect is now active and will follow your mouse and strike on clicks!
