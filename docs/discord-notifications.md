# Discord ranked 1v1 notifications and leaderboard

The matchmaker posts ranked activity and a live leaderboard to Discord:

- a player joining the ranked 1v1 queue;
- a ranked 1v1 result after replay verification and rating persistence succeed.
- the current 1v1 top 50 when the matchmaker starts and whenever that top 50 changes.

The leaderboard is sent to channel `1543424444935045260` by default. It includes
only players who have completed at least one rated Empire League match; seeded
and imported ladder history does not make an account eligible. Unchanged top-50
snapshots are suppressed.

Team games, tournaments, custom games, expired matches, and contested results do
not generate activity messages. A rated team result can still make a previously
inactive player eligible for the 1v1 leaderboard snapshot. Discord failures are
logged and never block matchmaking or result processing.

Discord posts are limited to five per player in any rolling 60-second window.
Queue posts count against the searching player. A completed-match post counts
against both participants and is suppressed when either participant has reached
the limit.

## Matchmaker configuration

Set both values in the matchmaker's server-side environment:

```dotenv
DISCORD_BOT_TOKEN=replace_with_the_bot_token
DISCORD_CHANNEL_ID=replace_with_the_target_text_channel_id
DISCORD_LEADERBOARD_CHANNEL_ID=1543424444935045260
```

`DISCORD_LEADERBOARD_CHANNEL_ID` is optional unless the leaderboard should be
sent somewhere other than the production channel shown above. The activity
channel remains independently configurable with `DISCORD_CHANNEL_ID`.

Never use a `VITE_` prefix for the token and never commit it. Ranked activity
notifications require both `DISCORD_BOT_TOKEN` and `DISCORD_CHANNEL_ID`. The
leaderboard requires the bot token and uses its default channel when no override
is configured.

## Discord configuration

1. Create an application in the Discord Developer Portal and add a bot to it.
2. Install the bot in the Empire League Discord server.
3. In both target channels, grant the bot `View Channel`, `Send Messages`, and
   `Embed Links`. No privileged gateway intents are needed because the
   matchmaker only sends outbound REST requests.
4. Enable Discord Developer Mode, choose **Copy Channel ID** on the activity
   channel, and use that value for `DISCORD_CHANNEL_ID`. Override
   `DISCORD_LEADERBOARD_CHANNEL_ID` only for a different leaderboard channel.
5. Copy or reset the bot token on the bot page and use it for
   `DISCORD_BOT_TOKEN`.
6. Restart the matchmaker after changing its environment.

Treat the bot token like a password. If it is exposed, reset it in the Developer
Portal and replace the matchmaker environment value immediately.
