# Planned change: sync the theme with system preferences

## Goal

Keep the site aligned with the visitor’s current light/dark preference until
they choose a theme manually.

## Planned work

- Validate saved theme values so only `light` and `dark` override the system.
- Listen for operating-system theme changes while no saved or in-session
  preference has been chosen.
- Preserve a visitor’s manual choice for the rest of the session and in
  local storage when storage is available.
- Retain a compatibility path for older `MediaQueryList` event APIs.

## Scope

- `assets/js/theme.js`
