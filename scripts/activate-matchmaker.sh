#!/usr/bin/env bash
set -euo pipefail

app_root="$1"
release_id="$2"
remote_archive="/tmp/empire-league-matchmaker.tar.gz"
release_dir="${app_root}/releases/${release_id}"
previous=""
if [[ -L "${app_root}/current" ]]; then
  previous="$(readlink -f "${app_root}/current")"
fi

install -d -m 0755 "${app_root}/releases" "${release_dir}"
tar -xzf "${remote_archive}" -C "${release_dir}"
mv "${release_dir}/scripts/matchmaker-package.json" "${release_dir}/package.json"
cd "${release_dir}"
npm install --omit=dev --no-audit --no-fund
node --env-file=/etc/empire-league-matchmaker.env scripts/migrate.mjs
chown -R empire-matchmaker:empire-matchmaker "${release_dir}"

ln -s "${release_dir}" "${app_root}/current.new"
mv -Tf "${app_root}/current.new" "${app_root}/current"
systemctl restart empire-league-matchmaker

healthy=0
for _attempt in {1..10}; do
  if curl -fsS http://127.0.0.1:4317/health >/dev/null 2>&1; then
    healthy=1
    break
  fi
  sleep 1
done

if [[ "${healthy}" -ne 1 ]]; then
  journalctl -u empire-league-matchmaker -n 50 --no-pager >&2
  if [[ -n "${previous}" ]]; then
    ln -s "${previous}" "${app_root}/current.rollback"
    mv -Tf "${app_root}/current.rollback" "${app_root}/current"
    systemctl restart empire-league-matchmaker
  fi
  exit 1
fi

rm -f "${remote_archive}" /tmp/activate-matchmaker.sh
find "${app_root}/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
  | sort -nr \
  | tail -n +6 \
  | cut -d' ' -f2- \
  | xargs -r rm -rf
