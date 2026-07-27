# AoE2 UI automation

Empire League normally automates AoE2 with window-local messages. The unverified-content confirmation is the exception: AoE2 ignores window messages for that modal, so EL briefly focuses the game and performs a guarded physical click before restoring the cursor.

The checked-in source of truth is `src/shared/aoe2UiManifest.ts`. Coordinates are stored in AoE2's 3840×2160 design space and scaled to the live client rectangle immediately before each action.

## Activation modes

- `click`: send `WM_MOUSEMOVE`, `WM_LBUTTONDOWN`, and `WM_LBUTTONUP` using the action's configured delivery mode.
- `clickEnter`: post the click above, wait for AoE2 to select the widget, then synchronously dispatch Enter with a bounded timeout.

Legacy buttons such as Multiplayer and Host Game require `clickEnter`. Create Lobby and direct lobby controls such as Ready, Start, browser tabs, civilization tiles, and Copy respond to `click`.

Click timing is action-specific. General navigation uses a 100 ms hover and
120 ms press. Ready and Start use a 250 ms hover and 250 ms press because the
lobby message loop can be throttled while AoE2 is in the background.

## Host flow

1. `multiplayer` (`clickEnter`)
2. `hostGame` (`clickEnter`)
3. `createLobby` (`click`)
4. Apply the standard lobby settings.
5. Select the matchmaker's map:
   1. Open the lobby's Location picker.
   2. Open Map Style and explicitly select Custom for a map listed in
      `customMapNames`, or Standard for every other map. AoE2 remembers this
      filter between visits, so both branches must set it.
   3. Focus the picker search field and send the selected map name with window-local `WM_CHAR` messages.
   4. Resolve the exact map's filtered-result index from the manifest and click that tile. This matters for substring collisions such as Aquarena/Arena and Land Nomad/Nomad.
   5. Verify that the lobby screen is present again before continuing.
6. Optionally select a civilization:
   1. Resolve the host's lobby slot (slot 1 in the automated 1v1 host flow) through `civilizationSlotDesignPoint` and click its civilization button.
   2. For a named civilization, enter its exact name in the picker search field.
   3. Click the fixed first civilization result after the four generic selector options.
   4. Dispatch Enter once to confirm the selected result and close the picker.
   5. Verify that AoE2 returned to the lobby room.
7. `copyLobbyUri` (`click`)
8. Verify the clipboard matches `aoe2de://0/<digits>`.
9. Publish that URI to the guest. This URI is the normal automated invitation path.
10. If an explicit in-game invite is needed, use `hostInvite`.
11. Wait for the guest-joined report.
12. `hostReady` (`click`) to finalize custom lobby files and release any required transfer.
13. If the guest reports accepting unverified content, verify `hostReady` again because AoE2 may automatically clear the host's Ready state.
14. Wait for the guest-ready report.
15. `startGame` (`click`)

The first three transitions are verified from stable points on AoE2's rendered
window surface. If the expected next screen is not present, that step is
retried once; the sequence stops rather than sending later coordinates to the
wrong screen.

## Guest flow

1. Receive the published `aoe2de://0/<digits>` URI.
2. Open the URI through Steam/AoE2.
3. Wait for the lobby screen to settle.
4. Optionally select a civilization using the client's lobby-slot civilization button (slot 2 in the automated 1v1 guest flow), the shared grid, and `confirmCivilization`.
5. Report that the guest joined so the host can ready and release custom lobby files.
6. After the host-ready report, poll `guestReady`.
7. Only when the selected map is listed in `customMapNames`, an unavailable Ready control triggers an attempt at AoE2's unverified user-generated-content warning. After a successful confirmation click, report content acceptance once so the host can verify and, if AoE2 cleared it, reapply Ready. The guest continues polling during this handshake.
8. Continue until AoE2 enables and verifies the guest Ready control or the transfer timeout expires. The guest and host lobby layouts intentionally use different ready points.
9. Report guest readiness to the matchmaker.
10. Wait for the host to start the match.

AoE2's unverified-content modal is accepted with one window-local Tab followed by Enter. The guest sends this sequence only once, then continues polling Ready while the host verifies its Ready state again.

## Lobby countdown

`lobbyTimingService.ts` is the countdown's source of truth. Its baseline follows the same manifest and runtime timing constants used by automation, including map-picker actions, optional civilization selection for both players, Ready ordering, WebSocket-delivered matchmaker events, custom-content confirmation, the second custom-map Host Ready, Start, and reveal.

After a successful setup, the client stores the difference between that match's calculated baseline and its measured end-to-end duration. Standard and custom-map histories are kept separately. Future estimates add the rolling median of the latest successful residuals to the match-specific baseline, so the countdown adapts to real Steam, AoE2, machine, and network overhead without losing the deterministic workflow model.

## Replay completion

Every detected replay write prompts an immediate operation-stream inspection.
The client declares the automated 1v1 complete as soon as it sees AoE2's
`PostGame` marker or a player's `Resign` action. During the first minute, six
seconds of file inactivity prompts a fallback recheck; afterward, three
seconds does. A temporarily unparseable recording without a terminal operation
remains under observation.

## Civilization grid

The manifest contains every currently visible Age of Empires II civilization in game build `101.103.48987.0`. Entries map names to grid column/row positions; grid centers are stored once. This avoids maintaining fifty independent pixel coordinates.

The first four cells are selector modes (Random, Full Random, Mirror, and Custom), not civilizations. The first civilization row therefore begins at column four.

Lobby civilization buttons are stored separately as eight row centers because
the correct button depends on the player's slot. The matchmaking flow currently
uses slot 1 for its host and slot 2 for its guest.

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
