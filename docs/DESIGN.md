# Design System & Aesthetic Guide: Arcade Mania

This document outlines the visual design language, styling conventions, typography, color palettes, UI components, animations, and layout structures strictly derived from `style.css` and `game.css`.

---

## 1. Visual Direction & Themes

The application blends **retro arcade cabinet styling** with modern flat UI and synthwave aesthetics:

1. **Hub / Menu Screen (`index.html`)**:
   - Bright, vibrant, playful arcade environment.
   - Pastel cyan sky backdrop with high-contrast navy borders, chunky hard-edged drop shadows, and neon coral/yellow/pink accents.
   - Dynamic floating decorative background elements.
2. **Platformer Screen (`game.html`)**:
   - Dark twilight synthwave aesthetic.
   - Deep indigo/purple gradient background, neon cyan highlighted platforms, dark navy geometric surfaces, and warm glowing collectibles.

---

## 2. Typography System

The project relies on two Google Fonts imported via `style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');
```

| Font Family | Weights | Usage Area | Design Characteristics |
| :--- | :--- | :--- | :--- |
| **`Oxanium`** | 400, 500, 600, 700 | Main titles (`h1`), section headers (`h2`), character names (`h3`), ability names, buttons, modal titles, HUD metrics | Futuristic, wide-tracking, sharp angles, arcade display style |
| **`Rajdhani`** | 400, 500, 600, 700 | Subtitles, body copy, stat labels, ability descriptions, modal instructions | Squared, condensed, high-legibility technical sans-serif |

### Typographic Scale
- **Main Game Title (`h1`)**: `clamp(45px, 7vw, 88px)`, weight 700, letter-spacing `6px`.
- **Section Heading (`h2`)**: `25px`, weight 600, letter-spacing `2px`.
- **Character Profile Name**: `31px`, letter-spacing `2px`.
- **Ability Title (`h3`)**: `21px`, letter-spacing `1px`.
- **Card Title (`h3`)**: `19px`, letter-spacing `2px`.
- **HUD Items**: `18px`, bold, `Oxanium`.
- **Subtitle / Menu Text**: `16px`, weight 600, letter-spacing `2px`.
- **Card Subtitle**: `13px`, weight 600, letter-spacing `1px`.
- **Stat Labels**: `13px`, weight 700, letter-spacing `1px`.
- **Buttons**: `11px`, weight 600, letter-spacing `1px`.
- **Info Labels**: `11px`, weight 600, letter-spacing `2px`.

---

## 3. Color Palette & Token Map

### A. Core Neutral & Structural Colors
| Token / Usage | Hex / RGBA | Role |
| :--- | :--- | :--- |
| **Menu Background** | `#d7f0f4` | Soft sky/ice blue page background |
| **Primary Navy Dark** | `#26345c` | Main headings, primary borders, high-contrast text |
| **Secondary Blue** | `#3155a6` | Subtitles, section badge backgrounds, modal borders |
| **Muted Blue / Gray** | `#66739a` | Descriptive paragraphs, subtitles, notes |
| **Card Surface** | `#fffdf8` | Warm off-white surface for cards and default buttons |
| **Panel Surface** | `#fff8e9` | Warm cream background for profile box and modals |
| **Stat Track Fill** | `#d8def0` | Empty background track for progress/stat bars |

### B. Accent & Character Thematic Colors
| Token / Usage | Hex / RGBA | Role |
| :--- | :--- | :--- |
| **Coral Accent** | `#ff6f61` | Title text-shadow, `#selectCharacter` button, glitch clone |
| **Coral Dark Shadow** | `#d95349` | Solid bottom shadow for `#selectCharacter` button |
| **Benny Gold** | `#f6b334` | Benny card border, `#startGame` border |
| **Benny Light Gold** | `#ffcd55` | Benny avatar background, `#startGame` button surface |
| **Benny Shadow** | `#d99e21` | Solid bottom shadow for `#startGame` button |
| **Vinnie Pink** | `#f990c4` | Vinnie card border |
| **Vinnie Soft Pink** | `#ffbede` | Vinnie avatar background |
| **Lilac Accent** | `#c78cff` | `#howToPlay` button surface |
| **Lilac Border** | `#a88af5` | Locked card border, `#howToPlay` button border |
| **Lilac Shadow** | `#8a70d5` | Solid bottom shadow for `#howToPlay` button |
| **Stat Bar Cyan** | `#54bde0` | Active fill for strength, speed, and defense bars |
| **Ability Lavender** | `#8b6fd8` | Special ability heading color |

### C. Canvas Platformer Colors (`game.css` & `game.js`)
| Token / Usage | Hex | Role |
| :--- | :--- | :--- |
| **Page Twilight Gradient** | `linear-gradient(180deg, #17163d, #302b63, #5b4b8a)` | Fullscreen container gradient |
| **Canvas Clear Background** | `#292552` | Canvas inner sky fill |
| **Canvas Ground Layer** | `#51427a` | Horizontal ground strip (y: 380, height: 40) |
| **Platform Body** | `#242451` | Platform rectangle base color |
| **Platform Neon Trim** | `#00d9ff` | 3px top border highlight on all platforms |
| **Energy Orb Base & Glow**| `#ffd83d` | Golden yellow glowing circle |
| **Canvas HTML Border** | `#ffffff` | 4px solid white border wrapping canvas |

---

## 4. UI Components & Patterns

### 1. Hard-Edged Retro Drop Shadows
Instead of soft Gaussian blurs, interactive elements use solid offset drop shadows that mimic classic arcade / 16-bit UI design:
- Title Shadow: `text-shadow: 4px 4px 0 #ff6f61`
- Section Headers: `box-shadow: 4px 4px 0 #ff6f61`
- Character Cards: `box-shadow: 0 6px 0 rgba(49, 85, 166, 0.12)`
- Profile Panel: `box-shadow: 0 7px 0 rgba(49, 85, 166, 0.14)`
- Buttons: `box-shadow: 0 4px 0 rgba(49, 85, 166, 0.15)`
- Action Buttons (Stateful): `#selectCharacter` (`0 5px 0 #d95349`), `#startGame` (`0 4px 0 #d99e21`)

### 2. Character Cards (`.characterCard`)
- **Dimensions**: `width: 210px`, `min-width: 210px`, `height: 270px`.
- **Border**: `3px solid`, custom colored per character index (1st/4th Benny `#f6b334`, 2nd/5th Vinnie `#f990c4`, 3rd/6th Locked `#a88af5`).
- **Corner Radius**: `border-radius: 16px`.
- **Image Frame**: `height: 180px`, `border-radius: 11px`, centered flexbox.
- **Hover Motion**: `transform: translateY(-7px)`, `box-shadow: 0 10px 0 rgba(49, 85, 166, 0.12)`.
- **Selected State**: `border-width: 4px`, `border-color: #ff6f61`, `transform: translateY(-5px)`.
- **Locked State**: `opacity: 0.55`.

### 3. Profile Panel (`.characterInfo`)
- Centered container (`max-width: 650px`), `background: #fff8e9`, `border: 4px solid #3155a6`, `border-radius: 15px`.
- Contains 3-column stat grid (`.stats`) displaying **Strength**, **Speed**, and **Defense**.
- Stat Bar: 8px tall track (`background: #d8def0`, `border-radius: 8px`), with `#54bde0` fill animated via `statLoad`.

### 4. Interactive Buttons (`button`)
- Default dimensions: `width: 155px`, `min-height: 46px`.
- Font: `'Oxanium'`, `11px`, letter-spacing `1px`.
- Hover behavior: `transform: translateY(-3px)`, shadow increases to `0 7px 0`.

### 5. Modals (`.modal`)
- Full-screen fixed overlay (`inset: 0`, `z-index: 20`) with frosted glass effect:
  `background: rgba(38, 52, 92, 0.45); backdrop-filter: blur(4px);`
- Modal Card (`.modalContent`): `width: min(90%, 430px)`, `background: #fff8e9`, `border: 3px solid #3155a6`, `border-radius: 14px`.
- Animation: `modalIn` (scales from 0.96 with vertical slide).

---

## 5. Motion & Animation Design

| Animation Name | Target Element | Duration / Easing | Description |
| :--- | :--- | :--- | :--- |
| **`cardTravel`** | `.characterTrack` | 24s, linear, infinite | Continuous horizontal conveyor belt translation from `-50%` to `0%`. Pauses on track hover. |
| **`titleFloat`** | `.gameHeader h1` | 3.5s, ease-in-out, infinite | Gentle vertical oscillation (`translateY(-7px)`). |
| **`glitch`** | `.gameHeader h1::after` | 6s, infinite | Neon coral glitch overlay visible only briefly at 90%–92% of the loop. |
| **`statLoad`** | `.statFill` | 1s, ease-out | Expands bar width smoothly from `0` on render. |
| **`modalIn`** | `.modalContent` | 0.25s, ease, forwards | Subtle zoom and slide up into position. |
| **`cloudMove1`** | `.bgCloud1` | 8s, ease-in-out, infinite | Horizontal sway (+20px). |
| **`cloudMove2`** | `.bgCloud2` | 10s, ease-in-out, infinite | Horizontal sway (-25px). |
| **`smallFloat1`** | `.bgPlayer1` | 5s, ease-in-out, infinite | Vertical sway (-10px). |
| **`smallFloat2`** | `.bgPlayer2` | 6s, ease-in-out, infinite | Vertical sway (+10px). |
| **`starTwinkle`** | `.bgStar` | 3s / 4s, ease-in-out, infinite| Scales from 1 to 1.15 and pulses opacity (0.35 to 1.0). |
| **`gameEnter`** | `.gameSection.active` | 0.5s, ease | Scale up from 0.97 (vestigial style from earlier prototype). |

### Accessibility: Reduced Motion
The stylesheet includes an explicit accessibility rule:
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
    }
}
```

---

## 6. Responsive Breakpoints

1. **Desktop / Default**:
   - Menu padding: `35px 45px 55px`.
   - Card dimensions: `210px x 270px`.
   - Stats grid: 3-column layout (`repeat(3, 1fr)`).
   - Menu buttons: horizontal row with `gap: 14px`.
2. **Mobile (`@media (max-width: 700px)` in `style.css`)**:
   - Screen padding: `25px 16px 40px`.
   - Title font size scales down to `42px`.
   - Card dimensions scale down to `175px x 235px` (image box `145px`).
   - Stats layout collapses to single-column (`1fr`, `gap: 13px`).
   - Menu buttons stack vertically (`flex-direction: column`, button width `210px`).
   - Background clouds and player icons reduce in size.
3. **Mobile (`@media (max-width: 600px)` in `game.css`)**:
   - Game page padding decreases to `12px`.
   - HUD text size decreases to `14px`.
   - Controls text size decreases to `13px`, `gap: 15px`.
