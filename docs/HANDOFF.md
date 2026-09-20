# Handoff Guide: Arcade Mania

This handoff document is prepared specifically for incoming AI agents and developers. It summarizes the current state, identifies immediate technical debts and bugs, and outlines a prioritized roadmap based strictly on observable code requirements.

---

## 1. Project Summary

**Arcade Mania** is a vanilla web-based 2D arcade platformer application developed by Drisana. It consists of:
1. **A Character Selection Hub (`index.html`)**: Richly animated, styled with retro-arcade aesthetics, allowing players to view and select between characters (Benny and Vinnie) and inspect their stats and lore.
2. **A Canvas Platformer (`game.html`)**: An interactive 1000x500 2D canvas running at 60 FPS with basic platform collision, gravity, jumping, and left/right movement.

The architecture is **pure static front-end** (Vanilla HTML5, CSS3, JavaScript ES6+) with **zero build dependencies**, communicating state via browser `localStorage`.

---

## 2. Immediate Issues & Technical Debt (Priority Ranked)

The following items are immediate bugs and gaps verified directly in the codebase that require attention:

### Priority 1: Critical Broken Asset Paths (Blocking Audio & Sprites)
- **Audio 404**: `index.html` references `src="audio/background.mp3"`, but the file is located at `assets/audio/background.mp3`.
- **Character Images 404 in Menu**: `index.html` character cards reference `images/benny.png` and `images/vinnie.png`, but the files are located in `assets/images/`.
- **Canvas Player Sprite 404**: `game.js` sets `playerImage.src` using `"images/benny.png"` and `"images/vinnie.png"`, causing the player sprite to fail loading on the canvas.
- **Missing Background Decor Assets**: `index.html` references 5 non-existent decorative image files: `images/cloud1.png`, `images/cloud2.png`, `images/smallBenny.png`, `images/smallVinnie.png`, and `images/star.png`.

### Priority 2: Git Working Tree Discrepancies
- The project files were relocated from `arcade_universe/` to the workspace root.
- The Git working tree currently has unstaged deletions of `arcade_universe/*` and untracked files in root and `assets/`.
- Staging and committing this migration will ensure clean version control history.

### Priority 3: UI & Script Discrepancies
- **Missing CSS rule for `.profileChange`**: `script.js` (lines 56–58) triggers a reflow and adds the class `profileChange` to `.characterInfo` when a card is selected, but `.profileChange` has no styling or animation defined in `style.css`.
- **Asymmetric Theme Application**: `script.js` adds `.benny-theme` to `document.body`, but does not add `.vinnie-theme` when Vinnie is selected, despite `.vinnie-theme` being defined in `style.css`.
- **Vestigial CSS in `style.css`**: Lines 466–497 in `style.css` style `#gameCanvas`, `.gameSection`, etc., which are relics from before the canvas was split into `game.html` and `game.css`.

### Priority 4: Incomplete Gameplay Features (Advertised in UI)
The "HOW TO PLAY" modal and HUD advertise several mechanics that are not yet coded into `game.js`:
- **Energy Collection**: A stationary energy orb is drawn at `(250, 305)`, but `update()` has no collision detection with the player, and the HUD energy counter (`#energy`) remains static at `0`.
- **Obstacles**: The instructions say "AVOID OBSTACLES", but no obstacle entities exist in `game.js`.
- **Lives System**: HUD shows `LIVES: 3`, but no death boundary, hazard, or life deduction logic is implemented.
- **Portal / Win Condition**: Instructions mention "REACH THE PORTAL", but no portal exists on the canvas.
- **Character Attributes**: Character speed is hardcoded to `5` in `game.js`; differences in stats (Benny Speed 55 vs Vinnie Speed 90) and abilities (Power Break vs Dash) are not yet integrated into the gameplay engine.

---

## 3. Quick Reference: File Map

| File Path | Role | Key Functions / Elements |
| :--- | :--- | :--- |
| [`index.html`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/index.html) | Hub View | Character track, profile card, modals (`#howToPlayModal`, `#creditsModal`), `<audio id="backgroundMusic">` |
| [`style.css`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/style.css) | Hub Styles | Google Fonts import, animations (`cardTravel`, `titleFloat`, `glitch`), responsive media queries |
| [`script.js`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/script.js) | Hub Controller | `characters` data object, `showCharacter()`, modal open/close handlers, audio gesture trigger |
| [`game.html`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/game.html) | Game View | `#gameHUD` (Energy, Lives, Exit), `#gameCanvas` (1000x500), `.controls` |
| [`game.css`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/game.css) | Game Styles | Twilight gradient background, canvas border styling, mobile responsive layout |
| [`game.js`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/game.js) | Game Engine | `gameLoop()`, `update()`, `draw()`, `platforms` array, keyboard event listeners |
| [`assets/audio/`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/assets/audio) | Media | `background.mp3` |
| [`assets/images/`](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/assets/images) | Media | `benny.png`, `vinnie.png` |

---

## 4. Architectural Invariants for Future Agents

Incoming agents must adhere to the following principles:
- **Do not introduce build tools or npm dependencies.** Keep it pure vanilla HTML/CSS/JS.
- **Do not redesign existing functioning layouts.** Maintain the retro-arcade visual language and established color palette.
- **Maintain cross-page state contract via `localStorage`** (`selectedCharacter`).
- **Always verify asset paths against the actual files on disk** under `assets/`.
