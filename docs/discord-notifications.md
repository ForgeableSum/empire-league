# Discord ranked 1v1 notifications

The matchmaker can post two kinds of message to one Discord text channel:

- a player joining the ranked 1v1 queue;
- a ranked 1v1 result after replay verification and rating persistence succeed.

Team games, tournaments, custom games, expired matches, and contested results do
not generate Discord messages. Discord failures are logged and never block
matchmaking or result processing.

Discord posts are limited to five per player in any rolling 60-second window.
Queue posts count against the searching player. A completed-match post counts
against both participants and is suppressed when either participant has reached
the limit.

## Matchmaker configuration

Set both values in the matchmaker's server-side environment:

```dotenv
DISCORD_BOT_TOKEN=replace_with_the_bot_token
DISCORD_CHANNEL_ID=replace_with_the_target_text_channel_id
```

Never use a `VITE_` prefix for the token and never commit it. Notifications stay
disabled when both values are blank. If only one is set, the matchmaker logs a
configuration warning and leaves notifications disabled.

## Discord configuration

1. Create an application in the Discord Developer Portal and add a bot to it.
2. Install the bot in the Empire League Discord server.
3. In the target channel, grant the bot `View Channel`, `Send Messages`, and
   `Embed Links`. No privileged gateway intents are needed because the
   matchmaker only sends outbound REST requests.
4. Enable Discord Developer Mode, choose **Copy Channel ID** on the target text
   channel, and use that value for `DISCORD_CHANNEL_ID`.
5. Copy or reset the bot token on the bot page and use it for
   `DISCORD_BOT_TOKEN`.
6. Restart the matchmaker after changing its environment.

Treat the bot token like a password. If it is exposed, reset it in the Developer
Portal and replace the matchmaker environment value immediately.
