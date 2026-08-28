# Empire League

<p align="center">
  <img src="src/renderer/assets/el5-ranked.png" alt="Empire League logo" width="420">
</p>

Empire League is an open-source community desktop client and matchmaker for
Age of Empires II: Definitive Edition. It provides ranked 1v1 and team
matchmaking, curated map pools, seasonal leagues, parties, social features,
custom games, and automated tournaments in a single Windows app.

The client coordinates private AoE2 lobbies through the game's standard user
interface, while the matchmaker handles queues, player ratings, and social
services. Recorded games are used to verify match results before ratings and
leaderboards are updated. Empire League is an independent community project
and is not affiliated with Microsoft or World's Edge.

## Architecture

- The Windows Electron client is built locally and published to a generic
  `electron-updater` feed under `/updates/windows`.
- Packaged clients check the update feed three seconds after startup and every
  ten minutes while running. Updates download in the background and present a
  mandatory, themed restart prompt when ready.
- Production clients connect to the public matchmaker hostname. Development
  uses `VITE_MATCHMAKER_URL`, falling back to `http://127.0.0.1:4317`.
- The matchmaker uses the `mysql2` driver with a MySQL-compatible database.
  Local Windows development uses MySQL 8, while production uses MariaDB behind
  a systemd service and Nginx.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for website, Windows client, auto-updater,
and matchmaker deployment instructions.

See [docs/discord-notifications.md](docs/discord-notifications.md) to enable
ranked 1v1 queue and verified-result posts in a Discord channel.

## Local development

Local development requires Node.js, npm, and a MySQL-compatible database.
MySQL 8 matches the Windows development environment; MariaDB is also supported
and is used in production.

Install dependencies and create a local environment file:

```powershell
npm.cmd install
Copy-Item .env.example .env
```

Create the database and application user configured in `.env`, replace the
example `DB_PASSWORD`, and apply the schema migrations:

```powershell
npm.cmd run db:migrate
```

Start the local matchmaker and Electron development client in separate shells:

```powershell
npm.cmd run matchmaker
npm.cmd run dev
```

To point development at another non-production matchmaker, set
`VITE_MATCHMAKER_URL` in the local environment. Packaged production builds use
the production matchmaker configured in the application source.

Other useful commands:

```powershell
npm.cmd run package
npm.cmd run test:maps
npm.cmd run test:civilizations
npm.cmd run test:replays
npm.cmd run test:replay-results
npm.cmd run test:ratings
npm.cmd run test:discord
```

## License

Original Empire League source code and documentation are available under the
[MIT License](LICENSE). The license does not grant rights to the Empire League
name or logos, or to Microsoft, Age of Empires, and other third-party assets.
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for details.
