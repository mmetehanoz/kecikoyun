# Kecikoyun

## Canliya Alma

1. Proje kokunde `.env` dosyasini olusturun:

   ```env
   VITE_BASE_PATH=/
   VITE_TURNSTILE_SITE_KEY=site_key_buraya
   TURNSTILE_SECRET_KEY=secret_key_buraya
   ```

   `VITE_TURNSTILE_SITE_KEY` herkese acik site key'dir. `TURNSTILE_SECRET_KEY` sadece backend ortam degiskeni olarak kalmalidir; `src/` altinda kullanmayin ve istemciye gondermeyin.

2. Cloudflare Turnstile panelinde canli alan adinizi widget'in hostname listesine ekleyin. Yerel test icin `localhost` de ekleyin.

3. Uretim paketini olusturun:

   ```bash
   npm ci
   npm run release:check
   ```

   Bu komut lint ve TypeScript kontrollerini calistirir, ardindan yayinlanacak dosyalari `dist/` altina uretir.

4. Barindirma saglayicinizda build komutu olarak `npm run release:check`, yayin dizini olarak `dist` kullanin. Ortam degiskenlerini saglayicinin gizli degisken ayarlarindan ekleyin; `.env` dosyasini yuklemeyin.

5. React Router icin sunucuda tum bilinmeyen yollar `index.html` dosyasina yonlendirilmelidir. Netlify'de `/* /index.html 200`, Nginx'te `try_files $uri $uri/ /index.html;` ayarini kullanin.

6. Site alt dizinde yayinlanacaksa `VITE_BASE_PATH` degerini `/alt-dizin/` biciminde ayarlayin. Kendi alan adinizin kokunde yayin icin `/` kullanin.

## Turnstile Guvenligi

Widget token'i istemcide alinmaktadir. Gercek koruma icin siparis olusturan backend endpoint'i token'i Cloudflare Siteverify API'sine `TURNSTILE_SECRET_KEY` ile gondermeli ve `success: true` olmadan siparisi kabul etmemelidir.
