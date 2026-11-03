# Crypto Files

Arsip interaktif 4 klasifikasi kriptografi x 3 metode (12 algoritma). Tanpa build step, murni HTML + CSS + ES Modules.

## Menjalankan
ES Modules tidak jalan jika `index.html` dibuka langsung (`file://`). Jalankan lewat server lokal:
```
npm start                      # atau: npx serve .
python -m http.server 8000     # alternatif, lalu buka http://localhost:8000
```
Bisa juga dengan ekstensi VS Code "Live Server". Uji logika: `npm test` (Node 18+).

## Struktur
```
index.html
src/
  main.js                    entry point
  core/      utils.js (hex, sha, modpow, ...), fields.js, config.js
  ui/        render.js (folder/tab/panel), scroll.js (animasi scroll)
  styles/    base.css (hero), folders.css (folder, tab, panel)
  features/
    index.js                 daftar semua folder
    block-cipher/            aes.js  tea.js  xtea.js
    stream-cipher/           rc4.js  lfsr.js  chacha20.js
    main-function/           hash.js  hmac.js  diffie-hellman.js
    math-basis/              hill.js  rsa.js  elgamal.js
tests/features.test.js
```

## Menambah algoritma
1. Buat `src/features/<folder>/nama.js` yang mengekspor `{ tab, name, desc, fields, actions }`.
2. Daftarkan di `index.js` folder tersebut. UI otomatis membuat tab dan panelnya.

Catatan: untuk pembelajaran, bukan untuk produksi (RSA/ElGamal berparameter kecil, TEA/XTEA mode ECB).
