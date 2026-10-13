# Breakfast in Tokyo

A browser game about movie monsters rampaging through a 61-hex Tokyo map.

The game runs entirely in HTML, CSS, and JavaScript. It includes evolving monsters, rival monsters, civilians, police, military units, scientists, city destruction, fires, scoring, animated movement, and synthesized sound effects.

## Run locally

Install Node.js, then run:

```sh
node preview.cjs
```

Open http://127.0.0.1:4173 in your browser.

## Files

- `dist/index.html`: game page and rules.
- `dist/style.css`: styling and map presentation.
- `dist/game.js`: game rules, saves, animation, and audio.
- `preview.cjs`: local static server.
- `test-*.cjs`: automated checks.
- `.openai/hosting.json`: existing Sites hosting configuration.

## Checks

Run the current rule checks from the repository directory:

```sh
node test-rubble.cjs
node test-rival-progression.cjs
node test-motion.cjs
node test-aim-weapons.cjs
node test-healing.cjs
node test-health.cjs
node test-score.cjs
```

Older test files document earlier rules and may require updates for current balance changes.

## Hosting

Publish the contents of `dist/` with any static web host. No backend or build step is required. Player progress is saved in each browser's local storage.

The current hosted game is https://breakfast-in-tokyo.validluck3.chatgpt.site/.
Sites manages access to that hosted copy. Deploying these files elsewhere requires a separate access system if restricted sharing is desired.
