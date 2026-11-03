// Uji cepat: setiap fitur enkripsi harus bisa dekripsi kembali ke teks asli.  Jalankan: npm test
import assert from 'node:assert/strict';
import folders from '../src/features/index.js';
const sample = { 'Hill Cipher (Aljabar Linear)': 'HELP', 'RSA (Faktorisasi Bilangan)': 'RSA ok', 'ElGamal (Logaritma Diskret)': 'ElGamal ok' };
const roundTrip = ['AES-256-GCM', 'TEA', 'XTEA', 'RC4', 'LFSR 16-bit', 'ChaCha20', ...Object.keys(sample)];
let n = 0;
for (const f of folders) for (const file of f.files) {
  const v = Object.fromEntries(file.fields.map(x => [x.id, x.value])), a = file.actions;
  if (roundTrip.includes(file.name)) {
    const text = sample[file.name] ?? 'Halo Kriptografi', [e, d] = file.name.startsWith('RSA') ? [a[1], a[2]] : [a[0], a[1]];
    const c = await e.run({ ...v, text }); assert.equal(await d.run({ ...v, text: c }), text, file.name);
  } else for (const act of a) assert.ok(await act.run({ ...v, mac: '' }) !== undefined, file.name);
  n++; console.log('OK ', file.name);
}
console.log(`${n} berkas lulus`);
