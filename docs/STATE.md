# Current Project State: Arcade Mania

This document provides a strict, factual inventory of the repository's current state as of inspection. No features are assumed or marked complete unless directly confirmed in the existing source files.

---

## 1. Feature Status Matrix

| Feature Area | Component | Implementation File(s) | Status | Details / Observations |
| :--- | :--- | :--- | :--- | :--- |
| **Menu Hub** | Page Layout & Styling | `index.html`, `style.css` | **Functional** | Responsive arcade-themed layout with title, carousel, profile box, and action buttons. |
| **Menu Hub** | Character Carousel | `index.html`, `style.css` | **Functional** | Infinite CSS horizontal translation (`cardTravel` 24s); pauses on hover. Contains 6 cards (Benny x2, Vinnie x2, Locked x2). |
| **Menu Hub** | Character Profile Switcher | `script.js`, `style.css` | **Functional** | Clicking Benny or Vinnie card updates name, description, ability, and stat bars. |
| **Menu Hub** | Character Selection State | `script.js` | **Functional** | Saves `selectedCharacter` in `localStorage`; defaults to `"vinnie"`. |
| **Menu Hub** | Selection Confirmation | `script.js` | **Functional** | Clicking "SELECT CHARACTER" displays `"CHARACTER SELECTED ✓"` for 1500ms. |
| **Menu Hub** | Instructions Modal | `index.html`, `script.js`, `style.css` | **Functional** | Opens on "HOW TO PLAY" click; closes on '×' or backdrop click. |
| **Menu Hub** | Credits Modal | `index.html`, `script.js`, `style.css` | **Functional** | Opens on "CREDITS" click; closes on '×' or backdrop click. |
| **Menu Hub** | Audio Playback Trigger | `index.html`, `script.js` | **Partially Functional (Path Broken)** | Click listener plays `<audio id="backgroundMusic">`, but media source path is broken (see Section 3). |
| **Menu Hub** | Background Floating Art | `index.html`, `style.css` | **Non-functional (Missing Assets)** | Image tags point to missing images (`cloud1`, `cloud2`, `smallBenny`, `smallVinnie`, `star`). |
| **Platformer** | Page Layout & HUD | `game.html`, `game.css` | **Functional** | Dark arcade gradient with HUD showing Energy, Title, Lives, and Exit button. |
| **Platformer** | Navigation / Exit | `game.html`, `game.js` | **Functional** | "EXIT" button redirects back to `index.html`. "START GAME" in `script.js` redirects to `game.html`. |
| **Platformer** | Canvas Loop & Renderer | `game.html`, `game.js` | **Functional** | 1000x500 `<canvas>` running `requestAnimationFrame` with background and platform rendering. |
| **Platformer** | Player Movement & Jump | `game.js` | **Functional** | Arrow Left/Right horizontal movement; Space bar jump impulse (`velocityY = -13`). |
| **Platformer** | Gravity & Platform Collision | `game.js` | **Functional** | Constant gravity (`+0.6`); top-surface AABB collision against 7 platforms (1 ground, 6 floating). |
| **Platformer** | Player Sprite Loading | `game.js` | **Partially Functional (Path Broken)** | Attempts to load sprite based on `selectedCharacter`, but points to `images/` instead of `assets/images/`. |
| **Platformer** | Energy Collection | `game.js`, `game.html` | **Not Implemented** | Energy orb drawn at fixed position `(250, 305)`; no collision check, no score increment, HUD remains at `0`. |
| **Platformer** | Lives / Damage System | `game.js`, `game.html` | **Not Implemented** | HUD shows `LIVES: 3`; no damage triggers, no fall death, no respawn logic. |
| **Platformer** | Obstacles | `game.js` | **Not Implemented** | Mentioned in "HOW TO PLAY" instructions; no obstacle entities exist in code. |
| **Platformer** | Portal / Level Completion | `game.js` | **Not Implemented** | Mentioned in "HOW TO PLAY" instructions; no portal entity or victory condition exists in code. |
| **Platformer** | Character Stats / Abilities in Game | `game.js` | **Not Implemented** | Movement speed is hardcoded to `5`; character speed/strength/ability differences from `script.js` are not applied. |

---

## 2. File-by-File Detailed Analysis

### `index.html`
- Contains semantic sections: `.backgroundArt`, `.gameHeader`, `.selectionSection`, `.characterInfo`, `.menuButtons`, and modals `#howToPlayModal` and `#creditsModal`.
- Links to `style.css` and imports `script.js`.
- Contains an `<audio id="backgroundMusic" loop>` tag with `<source src="audio/background.mp3" type="audio/mpeg">`.
- Has 6 character cards inside `.characterTrack`. Benny and Vinnie cards appear twice each to populate the looping animation track.

### `style.css`
- Imports Google Fonts: `Oxanium` and `Rajdhani`.
- Implements CSS keyframe animations: `cardTravel`, `titleFloat`, `glitch`, `statLoad`, `cloudMove1`, `cloudMove2`, `smallFloat1`, `smallFloat2`, `starTwinkle`, `modalIn`, `gameEnter`.
- Implements responsive layout adjustments under `@media (max-width: 700px)` and motion suppression under `@media (prefers-reduced-motion: reduce)`.
- Contains orphaned/vestigial CSS rules (lines 466–497: `.gameSection`, `.gameSection.active`, `.gameTop`, `#gameCanvas`, `#exitGame`) left over from an earlier prototype before the game was separated into `game.html`.

### `script.js`
- Declares `characters` object with data for `benny` and `vinnie` (name, description, strength, speed, defense, ability, abilityDescription).
- `showCharacter(character)` updates DOM text nodes, stat bars, `.selected` classes, and sets `localStorage`.
- Selection click triggers temporary button text change to `"CHARACTER SELECTED ✓"`.
- Sets up modal open/close click handlers.
- Sets up one-time document click listener to trigger `backgroundMusic.play()`.
- Sets up `#startGame` click listener redirecting to `"game.html"`.

### `game.html`
- Contains `#gameHUD` with energy display, title, lives display, and exit button.
- Contains `#gameCanvas` (`width="1000" height="500"`).
- Contains `#gameMessage` ("READY PLAYER") and `.controls` guide.
- Links to `game.css` and imports `game.js`.

### `game.css`
- Styles game screen with dark gradient: `linear-gradient(180deg,#17163d,#302b63,#5b4b8a)`.
- Styles HUD and controls with `Oxanium` and `Rajdhani` typography.
- Styles canvas with `#6dd5ed` fallback background and `image-rendering: pixelated`.
- Responsive layout under `@media (max-width: 600px)`.

### `game.js`
- Initializes canvas 2D context (`ctx`).
- Reads `selectedCharacter` from `localStorage` (default `"vinnie"`).
- Sets `playerImage.src` based on selected character.
- Declares `player` object: `{x: 80, y: 345, width: 55, height: 75, speed: 5, velocityY: 0, jumping: false}`.
- Declares stationary `energy` orb at `{x: 250, y: 305}`.
- Declares array of 7 platform objects (ground + 6 floating platforms).
- Keyboard input tracking on `keydown` and `keyup` for Arrow keys and Space bar.
- `update()` applies horizontal movement, gravity (+0.6), platform AABB collision, and canvas edge boundaries.
- `draw()` renders canvas clear, dark backgrounds, platforms with cyan highlights, glowing energy circle, and player sprite image.
- Loops via `requestAnimationFrame(gameLoop)`.
- `#exitGame` click redirects to `"index.html"`.

---

## 3. Discrepancies, Bugs, & Missing Assets

### A. Broken Asset Paths
1. **Audio Path Discrepancy**:
   - In `index.html`: `src="audio/background.mp3"`.
   - File location on disk: `assets/audio/background.mp3`.
   - **Impact**: Audio fails to load and console throws 404 error when attempting to play.
2. **Character Images in Hub (`index.html`)**:
   - In `index.html`: `src="images/benny.png"` and `src="images/vinnie.png"`.
   - File location on disk: `assets/images/benny.png` and `assets/images/vinnie.png`.
   - **Impact**: Character cards display broken image placeholders.
3. **Character Sprite in Game (`game.js`)**:
   - In `game.js` (line 8): `playerImage.src = selectedCharacter === "benny" ? "images/benny.png" : "images/vinnie.png"`.
   - File location on disk: `assets/images/benny.png` and `assets/images/vinnie.png`.
   - **Impact**: Canvas fails to draw the player sprite (`ctx.drawImage` only executes if `playerImage.complete` is true, and the image never loads).

### B. Missing Assets (Referenced in code but not present on disk)
The following 5 image files are referenced in `index.html` (lines 18–23) under `.backgroundArt` but do not exist in `assets/images/` or anywhere in the repository:
- `images/cloud1.png`
- `images/cloud2.png`
- `images/smallBenny.png`
- `images/smallVinnie.png`
- `images/star.png`

### C. Logic & Style Discrepancies
1. **Unimplemented CSS Class `.profileChange`**:
   - In `script.js` (lines 56–58), the script removes and re-adds class `.profileChange` to trigger a CSS animation.
   - In `style.css`, `.profileChange` is **never defined**. The re-triggering logic executes but produces no visual effect.
2. **Missing `vinnie-theme` Application**:
   - In `style.css` (line 463), `.vinnie-theme .characterCard.selected` is styled.
   - In `script.js` (lines 51–55), `document.body.classList.add("benny-theme")` is called when Benny is selected, but `.vinnie-theme` is never added to `document.body`.
3. **Hardcoded Player Speed in Canvas Engine**:
   - In `script.js`, Benny has speed 55 while Vinnie has speed 90.
   - In `game.js`, `player.speed` is hardcoded to `5` regardless of which character is selected.
4. **Non-Functional Energy, Obstacles, Lives, and Portal**:
   - As noted in Section 1, the core gameplay loop has basic platform physics, but none of the game objective mechanics (collecting energy, losing lives, encountering obstacles, or reaching a portal) are wired up.

---

## 4. Git Repository & Working Tree State

- **Active Branch**: `main`, up to date with `origin/main` (`https://github.com/drisanagupta-a/drisana_gupta_task2Probition-2026`).
- **Working Tree Status**:
  - **Unstaged Deletions**:
    - `arcade_universe/audio/background.mp3`
    - `arcade_universe/game.css`
    - `arcade_universe/game.html`
    - `arcade_universe/game.js`
    - `arcade_universe/images/benny.png`
    - `arcade_universe/images/vinnie.png`
    - `arcade_universe/index.html`
    - `arcade_universe/script.js`
    - `arcade_universe/style.css`
  - **Untracked Files**:
    - `assets/` (contains `audio/background.mp3`, `images/benny.png`, `images/vinnie.png`)
    - `game.css`
    - `game.html`
    - `game.js`
    - `index.html`
    - `script.js`
    - `style.css`
- **Root Cause**: The developer flattened the project structure from `arcade_universe/` to the workspace root without staging or committing the move.
