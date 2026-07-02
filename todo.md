# TODO

- [x] Remove custom cursor component usage on Home page.
- [x] Remove CSS that hid cursor (`cursor: none`) on pointer devices.
- [ ] Fix “tapped links go gray and never return until refresh”.
  - [ ] Replace `motion.button` portal cards with real anchor tags (`<a href target=_blank rel=noopener noreferrer>`), preserving styling.
  - [ ] Ensure hover/focus styles re-apply after click/active state (avoid persistent `:active/:visited` styling).
- [ ] Run build/dev and manually verify:
  - cursor behaves normally
  - tapping/hovering portals keeps colors consistent

