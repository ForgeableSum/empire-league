#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y nodejs npm mariadb-server nginx curl
systemctl enable --now mariadb nginx
ufw allow 80/tcp

if ! id empire-matchmaker >/dev/null 2>&1; then
  useradd --system --home-dir /opt/empire-league-matchmaker --shell /usr/sbin/nologin empire-matchmaker
fi
install -d -o empire-matchmaker -g empire-matchmaker -m 0755 /opt/empire-league-matchmaker/releases

if [[ ! -f /etc/empire-league-matchmaker.env ]]; then
  db_password="$(openssl rand -hex 24)"
  mariadb <<SQL
CREATE DATABASE IF NOT EXISTS empire_league CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'empire_league_app'@'127.0.0.1' IDENTIFIED BY '${db_password}';
ALTER USER 'empire_league_app'@'127.0.0.1' IDENTIFIED BY '${db_password}';
GRANT ALL PRIVILEGES ON empire_league.* TO 'empire_league_app'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
  install -o root -g empire-matchmaker -m 0640 /dev/null /etc/empire-league-matchmaker.env
  cat > /etc/empire-league-matchmaker.env <<ENV
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=empire_league
DB_USER=empire_league_app
DB_PASSWORD=${db_password}
MATCHMAKER_HOST=127.0.0.1
EMPIRE_MATCHMAKER_PORT=4317
PUBLIC_MATCHMAKER_URL=http://matchmaker.empireleague.gg
TICKET_DISCONNECT_GRACE_MS=20000
MATCH_REPORT_CORROBORATION_TIMEOUT_MS=3600000
ENV
fi

install -m 0644 /tmp/empire-league-matchmaker.service /etc/systemd/system/empire-league-matchmaker.service
install -m 0644 /tmp/nginx-matchmaker.conf /etc/nginx/sites-available/matchmaker.empireleague.gg
ln -sfn /etc/nginx/sites-available/matchmaker.empireleague.gg /etc/nginx/sites-enabled/matchmaker.empireleague.gg
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl daemon-reload
systemctl enable empire-league-matchmaker
systemctl reload nginx
rm -f /tmp/empire-league-matchmaker.service /tmp/nginx-matchmaker.conf
node --version
npm --version
