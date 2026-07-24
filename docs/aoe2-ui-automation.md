# AoE2 UI automation

Empire League automates AoE2 with window-local messages. It does not move, clip, or block the user's physical cursor.

The checked-in source of truth is `src/shared/aoe2UiManifest.ts`. Coordinates are stored in AoE2's 3840×2160 design space and scaled to the live client rectangle immediately before each action.

## Activation modes

- `click`: send `WM_MOUSEMOVE`, `WM_LBUTTONDOWN`, and `WM_LBUTTONUP` using the action's configured delivery mode.
- `clickEnter`: post the click above, wait for AoE2 to select the widget, then synchronously dispatch Enter with a bounded timeout.

Legacy buttons such as Multiplayer, Host Game, and Confirm Civilization require `clickEnter`. Create Lobby and direct lobby controls such as Ready, Start, browser tabs, civilization tiles, and Copy respond to `click`.

Click timing is action-specific. General navigation uses a 100 ms hover and
120 ms press. Ready and Start use a 250 ms hover and 250 ms press because the
lobby message loop can be throttled while AoE2 is in the background.

## Host flow

1. `multiplayer` (`clickEnter`)
2. `hostGame` (`clickEnter`)
3. `createLobby` (`click`)
4. Apply the standard lobby settings.
5. Optionally select a civilization:
   1. `hostCivilization` (`click`)
   2. Resolve the civilization name through `civilizationDesignPoint`.
   3. Click the resulting grid point.
   4. `confirmCivilization` (`clickEnter`)
6. `copyLobbyUri` (`click`)
7. Verify the clipboard matches `aoe2de://0/<digits>`.
8. Publish that URI to the guest. This URI is the normal automated invitation path.
9. If an explicit in-game invite is needed, use `hostInvite`.
10. Wait for the guest-ready report.
11. `hostReady` (`click`)
12. `startGame` (`click`)

## Guest flow

1. Receive the published `aoe2de://0/<digits>` URI.
2. Open the URI through Steam/AoE2.
3. Wait for the lobby screen to settle.
4. Optionally select a civilization using the client lobby's civilization button, the shared grid, and `confirmCivilization`.
5. `guestReady` (`click`). The guest and host lobby layouts intentionally use different ready points.
6. Report guest readiness to the matchmaker.
7. Wait for the host to start the match.

## Civilization grid

The manifest contains every currently visible Age of Empires II civilization in game build `101.103.48987.0`. Entries map names to grid column/row positions; grid centers are stored once. This avoids maintaining fifty independent pixel coordinates.

The first four cells are selector modes (Random, Full Random, Mirror, and Custom), not civilizations. The first civilization row therefore begins at column four.

## Updating after an AoE2 patch

1. Compare the installed executable version with `sourceGameVersion`.
2. Run development probes against the installed `widgetui` JSON and capture diagnostic screenshots.
3. Update manifest geometry or activation modes.
4. Validate host creation/copy, guest join/ready, host ready/start, and at least one civilization from every grid row.
5. Commit the new manifest version. Production matchmaking should never parse the installed UI files.

## Verification

Message delivery only proves Windows queued the input. Each destructive transition needs an outcome:

- Create/copy: clipboard contains a new lobby URI.
- Join: AoE2 accepted the URI and reached the lobby after the configured settle delay.
- Ready: sample a text-free point on AoE2's rendered Ready button before and
  after input. Green is already Ready; red permits one conditional retry;
  an ambiguous state fails safely without notifying the host.
- Start: matchmaker acknowledgements and replay/game-state detection.
- Civilization: development screenshot verification; production state verification can be added when a machine-readable lobby-state source is available.
