# Project Context: Arcade Mania

## 1. Overview & Purpose
**Arcade Mania** is a retro-futuristic 2D web arcade platformer project developed by Drisana (probation task 2 for GDG). The project is built entirely with standard web technologies (vanilla HTML5, CSS3, and JavaScript) and features no external runtime libraries or build pipelines.

The application is structured into two main phases:
1. **Character Selection & Hub Screen (`index.html`)**: A landing page where players can browse available characters ("Benny" and "Vinnie"), inspect character stats and special abilities, configure their character selection, review gameplay instructions and credits, and trigger background music.
2. **Platformer Gameplay Screen (`game.html`)**: An HTML5 Canvas-based 2D platformer environment where players control their selected character, run, jump between platforms, and navigate the game space.

---

## 2. High-Level Architecture & Page Flow

The application follows a lightweight multi-page web application architecture connected via native browser `localStorage`:

```
+-------------------------------------------------------------+
|                         index.html                          |
|  - Title, Subtitle, & Background Atmosphere                 |
|  - Looping Character Carousel (Benny, Vinnie, Locked)       |
|  - Dynamic Player Profile & Stat Bars                       |
|  - Modals: "How to Play" & "Credits"                        |
|  - Audio: Background music on first interaction             |
+-------------------------------------------------------------+
                               |
               [SELECT CHARACTER] -> saves to localStorage
               [START GAME]       -> navigates to game.html
                               v
+-------------------------------------------------------------+
|                          game.html                          |
|  - Game HUD (Energy: 0, Lives: 3, Title, Exit button)       |
|  - HTML5 Canvas (1000 x 500 resolution)                    |
|  - 2D Physics & Controls (Arrow keys, Space to jump)        |
|  - Platform rendering (7 distinct platforms)                |
|  - Player sprite rendered from localStorage character       |
|  - [EXIT] button -> navigates back to index.html            |
+-------------------------------------------------------------+
```

---

## 3. Core Features & Capabilities

### A. Character Selection Hub (`index.html`, `style.css`, `script.js`)
- **Animated Character Carousel**: Displays character cards in a continuous horizontally scrolling track (`characterTrack`) featuring Benny ("The Breaker"), Vinnie ("The Runner"), and "Locked" mystery cards. Hovering over the carousel pauses the motion.
- **Dynamic Character Profile**: Clicking an unlocked character card dynamically updates the player profile section with:
  - Character name and biographical description.
  - Animated stat bars representing **Strength**, **Speed**, and **Defense**.
  - Character-specific special ability name and ability description.
  - Theme changes (e.g., `.benny-theme` applied to `document.body`).
- **Persistence**: Remembers the selected character across reloads and across pages using `localStorage.getItem("selectedCharacter")`. Defaults to `"vinnie"` if none is stored.
- **Interactive Modals**:
  - **How To Play Modal**: Lists game control instructions (`← → MOVE`, `SPACE JUMP`, `COLLECT ENERGY`, `AVOID OBSTACLES`, `REACH THE PORTAL`).
  - **Credits Modal**: Credits the project to Drisana ("Designed & Developed by Drisana", "A fictional game universe").
  - Modals support closing via close button (`×`) or clicking anywhere outside the modal on the backdrop.
- **Background Music**: An HTML5 `<audio>` element configured to play `background.mp3` in a loop once the user makes their first interaction click anywhere on the page.

### B. Canvas Platformer Engine (`game.html`, `game.css`, `game.js`)
- **Canvas Rendering**: Renders onto a 1000x500 pixel `<canvas>` element with arcade-style colors and cyan-accented platforms.
- **Physics & Movement**:
  - Left and Right arrow key input for horizontal translation.
  - Vertical gravity simulation (`player.velocityY += 0.6`) and jump velocity (`-13` impulse).
  - Axis-Aligned Bounding Box (AABB) landing detection on 7 platform bounding boxes (ground platform + 6 floating platforms).
  - Horizontal canvas boundary constraints (clamping player `x` position between 0 and `canvas.width - player.width`).
- **Character Sprite Integration**: Reads `localStorage.getItem("selectedCharacter")` to choose between loading Benny or Vinnie's sprite image on the canvas.
- **HUD & Navigation**:
  - Displays game status metrics (`ENERGY: 0`, `LIVES: 3`).
  - "EXIT" button allowing players to instantly return to `index.html`.

---

## 4. Repository Structure & Migration History
The repository was originally authored with files nested under a subfolder named `arcade_universe/`. In recent working tree changes, the core files were moved to the root level (`index.html`, `style.css`, `script.js`, `game.html`, `game.css`, `game.js`) and multimedia assets were moved under `assets/audio/` and `assets/images/`.

This migration left the Git index containing unstaged deletions of `arcade_universe/*` and untracked files in the root, along with asset path discrepancies in HTML and JavaScript which are documented in detail in [STATE.md](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/docs/STATE.md).
