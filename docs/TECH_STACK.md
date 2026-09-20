# Technology Stack & Environment: Arcade Mania

This document outlines the technical architecture, runtime requirements, language specifications, browser APIs, and file structures strictly used in the **Arcade Mania** project.

---

## 1. Core Technology Stack

| Layer | Technology | Specification / Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Standard semantic HTML5 (`<header>`, `<section>`, `<main>`, `<canvas>`, `<audio>`, `<button>`). UTF-8 encoding. Responsive mobile viewport tag. |
| **Styling** | Vanilla CSS3 | Pure native CSS. No preprocessors (SASS/LESS), no utility frameworks (Tailwind), no UI component libraries. Utilizes CSS Grid, Flexbox, Keyframes, Transitions, CSS Clamping, and CSS Backdrop Filter. |
| **Scripting** | Vanilla JavaScript | Pure ECMAScript 2015+ (ES6+). No frameworks (React, Vue, Angular), no bundlers, no transpilers (TypeScript/Babel). Native DOM API manipulation and event dispatching. |
| **Rendering Engine** | HTML5 Canvas 2D | Native `CanvasRenderingContext2D` API on an explicit 1000x500 resolution canvas element. |
| **Loop / Timing** | Native Game Loop | Driven by `window.requestAnimationFrame()` delivering display-synced frame rates. |
| **Audio** | HTML5 Audio API | Native `<audio>` tag controlled programmatically via `HTMLMediaElement.play()`. |
| **State Persistence** | Web Storage API | `window.localStorage` used for cross-page character selection state (`selectedCharacter`). |
| **Fonts** | Google Fonts | Web fonts `Oxanium` and `Rajdhani` delivered via standard CSS `@import`. |

---

## 2. Dependencies & Build Pipeline

- **Zero Runtime Dependencies**: The application does not import any external JavaScript libraries (no Phaser, PixiJS, Three.js, Lodash, or jQuery).
- **Zero Build Tooling**: There is no `package.json`, `node_modules`, Vite, Webpack, Rollup, or Gulp setup.
- **Zero Server-Side Code**: Completely static client-side web application. Can be hosted on any static web server (e.g., GitHub Pages, Nginx, Apache, or local file server).

---

## 3. Browser APIs Used

### A. CanvasRenderingContext2D
- `ctx.clearRect(x, y, w, h)`: Clears frame on every update.
- `ctx.fillRect(x, y, w, h)`: Renders background layers and platform bodies.
- `ctx.beginPath()`, `ctx.arc(x, y, radius, 0, Math.PI * 2)`, `ctx.fill()`: Renders energy pickups.
- `ctx.shadowColor`, `ctx.shadowBlur`: Implements arcade glow effect around energy objects.
- `ctx.drawImage(image, x, y, width, height)`: Renders 2D character sprites once loaded.

### B. Web Storage (`localStorage`)
- `localStorage.getItem("selectedCharacter")`: Reads saved character name across page loads.
- `localStorage.setItem("selectedCharacter", value)`: Updates saved choice when changing cards or confirming selection.

### C. DOM & Event APIs
- `document.addEventListener("keydown", ...)` / `document.addEventListener("keyup", ...)`: Captures arrow key and space bar states.
- `document.addEventListener("click", ..., { once: true })`: Compliance pattern for browser autoplay policies requiring user gestures before playing audio.
- `window.location.href`: Handles client-side navigation between `index.html` and `game.html`.
- `void element.offsetWidth`: Forces DOM reflow to re-trigger CSS animations in `script.js`.

---

## 4. Assets & File Formats

| Category | File Format | File Path | File Size | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Audio** | MPEG Audio (`.mp3`) | `assets/audio/background.mp3` | ~1.43 MB | Looping background soundtrack |
| **Images** | PNG (`.png`) | `assets/images/benny.png` | ~4.19 KB | Benny character avatar and 2D sprite |
| **Images** | PNG (`.png`) | `assets/images/vinnie.png` | ~4.88 KB | Vinnie character avatar and 2D sprite |

---

## 5. Complete Directory Tree

```
c:\Users\Drisana\OneDrive\Documents\drisana_task2gdg\drisana_gupta_task2Probition-2026\
├── .git/                        # Git version control metadata
├── assets/
│   ├── audio/
│   │   └── background.mp3       # Background audio track
│   └── images/
│       ├── benny.png            # Benny character sprite
│       └── vinnie.png           # Vinnie character sprite
├── docs/                        # Project documentation suite
│   ├── CONTEXT.md               # Overview, domain, and architecture
│   ├── DESIGN.md                # Design system, tokens, and styling
│   ├── HANDOFF.md               # Next steps, known issues, and pointers
│   ├── RULES.md                 # Development guidelines and constraints
│   ├── STATE.md                 # Feature completeness and bug inventory
│   └── TECH_STACK.md            # Technology stack reference
├── game.css                     # Stylesheet for game canvas page
├── game.html                    # 2D Canvas platformer page
├── game.js                      # Canvas platformer physics & loop
├── index.html                   # Main menu & character selection hub
├── script.js                    # Hub state management & interaction logic
└── style.css                    # Main hub design & animation stylesheet
```
