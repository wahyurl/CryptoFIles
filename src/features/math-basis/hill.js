import { mod } from '../../core/utils.js';
const hill = (v, decrypt) => {
  const [a, b, c, e] = v.key.trim().split(/\s+/).map(Number); let m = [a, b, c, e];
  const det = mod(a * e - b * c, 26); let di = 0; for (let i = 1; i < 26; i++) if (mod(det * i, 26) === 1) di = i;
  if (!di) throw Error('Determinan tidak punya invers mod 26. Ganti kunci (contoh: 3 3 2 5).');
  if (decrypt) m = [e, -b, -c, a].map(x => mod(x * di, 26));
  let t = v.text.toUpperCase().replace(/[^A-Z]/g, ''); if (t.length % 2) t += 'X'; let r = '';
  for (let i = 0; i < t.length; i += 2) { const p = t.charCodeAt(i) - 65, q = t.charCodeAt(i + 1) - 65; r += String.fromCharCode(65 + mod(m[0] * p + m[1] * q, 26), 65 + mod(m[2] * p + m[3] * q, 26)); }
  return r;
};
export default {
  tab: 'Hill Cipher', name: 'Hill Cipher (Aljabar Linear)',
  desc: 'Enkripsi matriks 2x2 atas modulo 26. Kunci: 4 angka (a b c d), determinan harus koprima dengan 26.',
  fields: [{ id: 'text', label: 'Teks (huruf A-Z)', value: 'HELLO' }, { id: 'key', label: 'Kunci matriks', value: '3 3 2 5' }],
  actions: [{ label: 'Enkripsi', run: async v => hill(v, false) }, { label: 'Dekripsi', run: async v => hill(v, true) }],
};
