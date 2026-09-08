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
3. Open the Visibility dropdown and explicitly select the required entry. The
   live dropdown is ordered `Public`, `Private`: tournament matches select
   `Public` because AoE2 only enables `Allow Spectators` for public lobbies;
   ranked and custom matches select `Private` to stay out of the public lobby
   browser while preserving direct lobby-URI joining.
4. Open the Players dropdown, send Home to select its first entry (`2`), and
   confirm with Enter. The live dropdown is ordered `2` through `8`, and AoE2
   remembers the previous value, so this is repeated for every ranked 1v1.
5. For tournament matches, enter a newly generated 12-character lobby password,
   then enable `Allow Spectators` on the Create Lobby dialog so the tournament's
   live-view link can open the game without leaving player slots unprotected.
   The password is carried in the published lobby metadata for the guest join
   flow. Ranked and custom lobbies leave both controls unchanged.
6. `createLobby` (`click`)
7. Apply the standard lobby settings. Reset Settings applies directly and does
   not open a confirmation dialog, so no Enter input is required afterward.
   AoE2 can keep its window thread busy beyond the initial settle delay while
   applying the reset. Continue only after harmless, bounded `WM_NULL` probes
   show that the thread is responsive and the lobby surface is stable across
   consecutive captures; log the click, every probe and retry, window health,
   every state verification, and total duration.
8. Select the matchmaker's map:
   1. Open the lobby's Location picker.
   2. Open Map Style and explicitly select Custom for a map listed in
      `customMapNames`, or Standard for every other map. AoE2 remembers this
      filter between visits, so both branches must set it.
   3. Focus the picker search field and send the selected map name with window-local `WM_CHAR` messages.
   4. Resolve the exact map's filtered-result index from the manifest and click that tile. This matters for substring collisions such as Aquarena/Arena and Land Nomad/Nomad.
   5. Verify that the lobby screen is present again before continuing.
9. For Team Games, explicitly select the map size after map selection so AoE2's
   remembered/default value cannot leak into the match: `Medium (4 player)
   [168]` for 2v2 and `Large (8 player) [220]` for 4v4. Open the Map Size
   dropdown and click its measured row directly because the control ignores
   directional key messages.
10. For custom random-map rooms, apply every host-selected game dropdown after
   map selection: Map Size, AI Difficulty, Resources, Population, Game Speed,
   Reveal Map, Starting Age, Ending Age, Treaty Length, and Victory. Select the
   measured list row directly because these controls ignore Up/Down messages.
   For Population and Treaty options below the eight-row viewport, advance the
   list's scroll-down control before clicking the last visible row. The final
   option uses the reliable End shortcut. Scenario rooms retain their
   scenario-defined values.
11. For every reserved custom-room AI slot, open that row's player-type
    dropdown and click the normal DE `AI` row directly. Do not use the final
    entry because that selects the legacy HD AI. Copy the private lobby URI
    before changing player types, but do not return or publish it until every
    AI row has been configured. The host then applies each AI civilization and team using the
    host-layout row controls. Guests cannot join until this finishes, so their
    AoE2 row numbers match the human slots assigned around the AI reservations.
12. Optionally select a civilization:
   1. Resolve the host's lobby slot (slot 1 in the automated 1v1 host flow) through `civilizationSlotDesignPoint` and click its civilization button.
   2. For a named civilization, enter its exact name in the picker search field.
   3. Click the fixed first civilization result after the four generic selector options.
   4. Dispatch Enter once to confirm the selected result and close the picker.
   5. Verify that AoE2 returned to the lobby room.
13. `copyLobbyUri` (`click`)
14. Verify the clipboard matches `aoe2de://0/<digits>`.
15. Publish that URI to the guest. This URI is the normal automated invitation path.
16. If an explicit in-game invite is needed, use `hostInvite`.
17. Wait for the guest-joined report.
18. `hostReady` (`click`) to finalize custom lobby files and release any required transfer.
19. If the guest reports accepting unverified content, verify `hostReady` again because AoE2 may automatically clear the host's Ready state.
20. Wait for the guest-ready report.
21. `startGame` (`click`)

The first three transitions are verified from stable points on AoE2's rendered
window surface. If the expected next screen is not present, that step is
retried once; the sequence stops rather than sending later coordinates to the
wrong screen.

## Guest flow

1. Receive the published `aoe2de://0/<digits>` URI.
2. Pass the URI directly to AoE2's bundled `Tools_Builds/AOEURLHelper.exe`; do not depend on Windows having the optional `aoe2de://` protocol association. The helper performs the Steam handoff required by an already-running game.
3. Wait 13 seconds for AoE2 to process the asynchronous handoff. Join-time pixel polling is intentionally avoided because transient and resolution-dependent lobby colors can reject successful joins.
4. For tournament matches, focus the password prompt, enter the password published by the host without logging its value, click Connect, and allow the lobby to settle. Ranked and custom joins skip this step. Spectator links use their separate handoff and never receive the password.
5. In games with multiple guests, report that each guest joined as soon as its lobby has settled. This releases only the next guest so AoE2 assigns deterministic slots around any AI rows reserved by the host; the joined guest can continue its remaining setup in parallel with later guests. The 1v1 flow retains its original ordering and reports the sole guest after civilization selection.
6. Optionally select a civilization using the client's assigned lobby-slot civilization button, a cleared search field, and the filtered result coordinate. A persistent white outline proves selection; a gray outline proves the requested tile acquired hover/focus and permits Enter activation. Unverified input falls back immediately instead of repeating the same click. Random fallback clears the filter, makes one selection attempt, and verifies the picker closed. Team selection follows on the same client while other joined guests perform their own setup. The displayed setup estimate includes the join allowance once for every sequential guest.
7. After the host-ready report, poll `guestReady`.
8. Only when the selected map is listed in `customMapNames`, an unavailable Ready control triggers an attempt at AoE2's unverified user-generated-content warning. After a successful confirmation click, report content acceptance once so the host can verify and, if AoE2 cleared it, reapply Ready. The guest continues polling during this handshake.
9. Continue until AoE2 enables and verifies the guest Ready control or the transfer timeout expires. The guest and host lobby layouts intentionally use different ready points.
10. Report guest readiness to the matchmaker.
11. Wait for the host to start the match.

AoE2's unverified-content modal is accepted with one window-local Tab followed by Enter. The guest sends this sequence only once, then continues polling Ready while the host verifies its Ready state again.

## Lobby countdown

`lobbyTimingService.ts` is the countdown's source of truth. Its baseline follows the same manifest and runtime timing constants used by automation, including map-picker actions, optional civilization selection for both players, Ready ordering, WebSocket-delivered matchmaker events, custom-content confirmation, the second custom-map Host Ready, Start, and reveal.

The baseline also includes measured allowances for AoE2 UI verification work that is not reducible to click/settle constants. August 2026 host and guest audits established a 9-second host setup allowance, a 13-second guest lobby-open allowance, and longer civilization search/verification settles. These apply before the guest-joined milestone for both standard and custom-map flows.

Adaptive calibration is controlled by `adaptiveLobbyTimingEnabled` in `runtimeConfig.ts` and is disabled by default, so countdowns use the deterministic match-specific baseline. When enabled, the client stores the difference between a successful match's calculated baseline and its measured end-to-end duration. Standard and custom-map histories are kept separately, and future estimates add the rolling median of the latest successful residuals to the baseline.

Before publishing a ranked or tournament lobby, the host relays completed input steps through `/matches/:id/setup-progress`, at most once every five seconds. Each step counts only once per match; retries, verification polling, failed inputs, and input-guard health messages do not count. The server accepts reports only from the accepted match's host before lobby publication, refreshes its setup timeout, and sends `lobby_setup_progress` to waiting guests to refresh their watchdogs. This allows slow but advancing setup without changing the displayed estimate. Deploy the matchmaker support before updating clients; both host and guest clients need the update for the guest watchdog fix.

Closing AoE2 cancels pending civilization selection at its next asynchronous boundary. Cancelled host preparation cannot publish a lobby or report a second critical failure after match cleanup.

`PREP_TIMING` diagnostics start at create-lobby and civilization-selection IPC entry, before the existing sequence timer. Each trace has an ID, context, elapsed time, and phase start/completion durations. Nested phases identify Steam registry/library/manifest checks, language-history scans, localization cache hits, resource reads/parsing, lookup construction, and window preparation. These records reach the downloadable diagnostic log and do not refresh setup watchdogs. Missing manifests in alternate Steam libraries can produce a failed read phase during otherwise successful detection.

Create-lobby, civilization selection, and localization requests reuse the last successfully detected installation. Explicit installation checks still rescan and replace or clear that cache; unsuccessful detection is never cached. Historical language lookup reuses the in-memory confirmed/remembered language, while current-session polling continues reading the newest log and updating the language. Overrides retain their existing precedence. `installation-cache` and `language-cache` timing records identify the fast paths.

Civilization tile and return-to-lobby verification retry unavailable pixels for up to five seconds, polling every 100 ms while the existing capture worker refreshes. No additional input is sent during this wait. Partial tile-border samples count as unavailable too. Readable states retain the existing selection/fallback rules; persistent missing pixels produce a screen-capture error rather than a civilization-unavailable error. `CIV_CAPTURE` records waiting, recovery, and timeout without refreshing the progress watchdog. Match cancellation interrupts the wait before another read.

All multi-pixel UI state checks pin one capture frame and its freshness time for the duration of the synchronous check, so crossing the one-second freshness boundary between pixels cannot invalidate half a check. Fresh-frame waits respect their caller's deadline even if the native worker stalls. A capture request outstanding for four seconds is retired; a replacement starts only once that worker exits, preventing accumulation of workers stuck in native code. Old-generation and retired-worker replies are ignored.

`CAPTURE_PIPELINE` records reach the downloadable log, at most once per second for normal frame delivery. `QueueMs` measures dispatch to worker entry, `RenderMs` measures PrintWindow/fallback rendering, `CopyMs` measures pixel extraction, `DeliveryMs` measures worker completion to main-thread handling, and `TimerLagMs` exposes delayed main-thread timer callbacks. These diagnostics do not count as automation progress. Worker startup, timeout, retirement, and exit events are logged separately.

## Replay completion

Every detected replay write prompts an immediate operation-stream inspection.
The client declares the automated 1v1 complete as soon as it sees AoE2's
`PostGame` marker or a player's `Resign` action. During the first minute, six
seconds of file inactivity prompts a fallback recheck; afterward, three
seconds does. A temporarily unparseable recording without a terminal operation
remains under observation.

Team-game client recovery is intentionally separate from final result
verification. A `Resign` action for the local replay slot, or a local
perspective `PostGame` marker after defeat, immediately arms the return-to-main-
menu overlay without stopping replay monitoring. Resignations from other slots
do not trigger that overlay. The custom room is finished, and a ranked result
is submitted, only after the replay contains complete match-wide results.

## Localization

Empire League reads the final `SetCurrentLanguage(<index>)` entry from the newest
usable AoE2 `MainLog.txt`. Language detection never blocks AoE2 startup or lobby
automation. Fifteen seconds after the game window becomes ready, the renderer
starts checking the current session in the background every five seconds for up
to five minutes. It updates as soon as the second, profile-loaded language entry
is available and remembers that confirmed language for future launches.
The Settings page shows the effective language and permits a confirmed manual
override. The override feeds both localized UI content and automation, and a
later authoritative AoE2 detection with a different language replaces it.
The index follows the Game Language dropdown order and maps
to the matching `resources/<language>/strings/key-value/key-value-strings-utf8.txt`
file. Polish is the final dropdown entry rather than being grouped before
Russian. The English file is reverse-indexed to obtain stable string keys for
canonical map and civilization names; those same keys resolve the active
language. Official map descriptions and the civilization bonus/team-bonus
sections are resolved from the same stable keys and cleaned of AoE2 markup for
display. Canonical names remain in matchmaking and storage, while localized
names are used for display and AoE2 picker searches. Custom map descriptions,
custom map filenames, and scenario filenames are never translated. Missing
logs, files, parsed sections, or strings fall back to the checked-in English
content.

## Civilization grid

The manifest contains every currently visible Age of Empires II civilization in game build `101.103.48987.0`. Entries map names to grid column/row positions; grid centers are stored once. This avoids maintaining fifty independent pixel coordinates.

The first four cells are selector modes (Random, Full Random, Mirror, and Custom), not civilizations. The first civilization row therefore begins at column four.

Lobby civilization buttons are stored separately as eight row centers because
the correct button depends on the player's slot. The matchmaking flow currently
uses slot 1 for its host and slot 2 for its guest.

Custom-room AI reservations use those same row centers. Player-type selection
uses the host lobby's `NameDropDown`; AI civilization and team selections also
use host-layout coordinates even for slots 2-8. Human guest settings continue
to use the guest-layout team hitbox. AI roster changes, human slot changes, and
all game settings are rejected after lobby automation begins.

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
- Start: matchmaker acknowledgements and replay/game-state detection. Once
  confirmed, match lifecycle and replay reporting advance independently from
  Windows foreground focus. The client releases lobby input suppression,
  retries the AoE2 handoff within a bounded window, and degrades to a manual
  switch warning instead of remaining on `Starting game`. Native handoff
  attempts are persisted in `logs/gameplay-handoff.jsonl` under Electron's
  user-data directory.
- Civilization: tile outlines verify selection while the picker is open. The
  picker's search-control chrome verifies that it actually closed; filtered
  tile color is diagnostic only because unowned DLC civilizations are dimmed.
  Replay result agreement does not compare civilization IDs: an unowned DLC
  selection may legitimately fall back to Random without invalidating the
  players, outcome, teams, or ranked game settings.

A replay containing `PostGame` can still be an intermediate file snapshot: AoE2
may flush the terminal operation before the parsed winner/loser summary settles.
An inconsistent summary remains retryable so the next replay write or stability
notification can produce usable result metadata.
