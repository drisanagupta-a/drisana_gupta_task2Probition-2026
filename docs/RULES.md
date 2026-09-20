# Project Rules & Guidelines: Arcade Mania

This document defines the strict development rules, architectural constraints, design conventions, and coding guidelines that all future agents and contributors must follow when working on **Arcade Mania**.

---

## 1. Architectural & Dependency Rules

1. **No External Libraries or Frameworks**:
   - Do **NOT** install or introduce external frameworks (React, Vue, Angular, Svelte, Next.js).
   - Do **NOT** introduce game development libraries (Phaser, PixiJS, Three.js, Kaboom).
   - Do **NOT** add CSS utility frameworks (Tailwind, Bootstrap) or preprocessors (SASS/SCSS).
   - Maintain pure, unbundled **Vanilla HTML5, CSS3, and JavaScript**.
2. **No Build Step Required**:
   - Do **NOT** initialize `package.json`, Webpack, Vite, Parcel, or Rollup unless explicitly instructed by the user.
   - All files must remain directly executable by loading `index.html` or `game.html` in standard modern web browsers.
3. **Multi-Page Architecture Preservation**:
   - Keep the clear separation between the Menu/Hub (`index.html`) and the Game Engine (`game.html`).
   - Navigation between screens must remain native via `window.location.href`.

---

## 2. State & Storage Contract Rules

1. **`localStorage` Key Convention**:
   - The application communicates the active character selection across pages using the exact key:
     ```javascript
     localStorage.getItem("selectedCharacter")
     localStorage.setItem("selectedCharacter", characterName)
     ```
2. **Permitted Values**:
   - Currently valid values are `"benny"` and `"vinnie"`.
   - Always provide a fallback to `"vinnie"` if the value is `null` or unselected:
     ```javascript
     const selectedCharacter = localStorage.getItem("selectedCharacter") || "vinnie";
     ```
3. **Character Object Structure**:
   - When referencing or extending character data, maintain the established data schema established in `script.js`:
     ```javascript
     {
         name: "STRING",
         description: "STRING",
         strength: NUMBER_0_TO_100,
         speed: NUMBER_0_TO_100,
         defense: NUMBER_0_TO_100,
         ability: "STRING",
         abilityDescription: "STRING"
     }
     ```

---

## 3. Asset Management & Path Rules

1. **Canonical Asset Locations**:
   - All media assets must be stored in and referenced from the `assets/` directory:
     - Audio files: `assets/audio/`
     - Image sprites & artwork: `assets/images/`
2. **Broken Path Prevention**:
   - Do **NOT** use bare paths like `images/benny.png` or `audio/background.mp3`.
   - Relative paths from root HTML files must always prefix with `assets/` (e.g., `assets/images/benny.png`, `assets/audio/background.mp3`).
3. **No Phantom Asset References**:
   - Do not add `<img src="...">` or `new Image()` calls pointing to files that do not physically exist on disk. If visual placeholders are needed, generate actual image files or use pure CSS/canvas rendering.

---

## 4. Visual Design & Aesthetic Rules

1. **Typography Discipline**:
   - **Titles, Headings, Buttons, HUD**: Strictly use `'Oxanium', sans-serif`.
   - **Body, Subtitles, Descriptions, Stats**: Strictly use `'Rajdhani', sans-serif`.
   - Never default to generic system fonts (`Arial`, `Times New Roman`).
2. **Retro Hard-Edged Drop Shadows**:
   - Do **NOT** use soft, blurry box shadows (`box-shadow: 0 4px 12px rgba(...)`).
   - Use crisp, zero-blur solid offset shadows matching the arcade aesthetic:
     ```css
     box-shadow: 4px 4px 0 #ff6f61;
     box-shadow: 0 6px 0 rgba(49, 85, 166, 0.12);
     box-shadow: 0 4px 0 #d99e21;
     ```
3. **Color Palette Adherence**:
   - Use the exact colors defined in [DESIGN.md](file:///c:/Users/Drisana/OneDrive/Documents/drisana_task2gdg/drisana_gupta_task2Probition-2026/docs/DESIGN.md).
   - Retain character theme color coding: Benny = Gold/Yellow (`#f6b334`, `#ffcd55`), Vinnie = Pink (`#f990c4`, `#ffbede`), Locked = Lilac/Purple (`#a88af5`).
4. **Motion & Accessibility**:
   - Any new keyframe animations must respect the `prefers-reduced-motion: reduce` media query in `style.css`.
   - Hover animations should be subtle (`translateY(-3px)` to `-7px`).

---

## 5. Canvas Engine & Gameplay Rules

1. **Canvas Resolution**:
   - The native canvas resolution is fixed at `1000 x 500`:
     ```html
     <canvas id="gameCanvas" width="1000" height="500"></canvas>
     ```
   - Responsive scaling is achieved strictly via CSS (`width: 100%; height: auto;`). Game logic coordinates must strictly assume a 1000x500 space.
2. **Audio Autoplay Policy**:
   - Web browsers block unprompted audio autoplay. Audio playback must strictly be tied to a user gesture (such as the document click listener with `{ once: true }` in `script.js`).
3. **Physics & Bounds**:
   - Maintain horizontal boundary clamping: player `x` must be constrained within `[0, canvas.width - player.width]`.
   - Platform collision must respect bounding boxes and only trigger landing when the player is descending (`velocityY >= 0`).

---

## 6. Git & Workflow Rules

1. **Working Tree Cleanliness**:
   - When staging commits, resolve the unstaged deletions in `arcade_universe/` to avoid cluttering git history.
2. **No Unwarranted Refactoring**:
   - Do not refactor functional code or rewrite functioning CSS just for personal styling preferences. Preserve the original author's architecture and variable naming conventions.
