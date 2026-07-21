#!/usr/bin/env bash

set -euo pipefail

if [[ ! -f .env ]]; then
  echo "Hata: .env bulunamadi. .env.example dosyasini temel alarak olusturun."
  exit 1
fi

site_key="$(sed -n 's/^VITE_TURNSTILE_SITE_KEY=//p' .env | tail -n 1 | tr -d '[:space:]')"

if [[ -z "$site_key" ]]; then
  echo "Hata: VITE_TURNSTILE_SITE_KEY tanimli degil."
  exit 1
fi

if ! grep -q '^TURNSTILE_SECRET_KEY=.' .env; then
  echo "Uyari: TURNSTILE_SECRET_KEY tanimli degil. Sunucu tarafinda Siteverify dogrulamasi yapilamaz."
fi

npm run lint
npm run build

if [[ ! -f dist/index.html ]]; then
  echo "Hata: Uretim paketi olusturulamadi."
  exit 1
fi

echo "Hazir: dist/ klasoru yayinlanabilir."
