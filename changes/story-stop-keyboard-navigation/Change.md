# Planned change: keyboard navigation for journey stops

## Goal

Make the map markers and story-stop links faster to navigate without a mouse.

## Planned work

- Add chronological arrow-key movement within the map-marker group and within
  the story-stop link group.
- Support Home and End to move to the first and last stop in the current group.
- Keep links as links: moving focus will not activate a stop or change the URL.
  Enter retains the link's normal activation behavior.

## Scope

- `assets/js/journey.js`
