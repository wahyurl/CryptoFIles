import { modinv, modpow } from '../../core/utils.js';
const keys = v => { const p = BigInt(v.p), q = BigInt(v.q), e = BigInt(v.e), n = p * q, phi = (p - 1n) * (q - 1n), d = modinv(e, phi); if (d === null) throw Error('e tidak koprima dengan phi(n).'); return { n, phi, e, d }; };
export default {
  tab: 'RSA', name: 'RSA (Faktorisasi Bilangan)',
  desc: 'Keamanan bertumpu pada sulitnya memfaktorkan n = p x q. Bilangan prima kecil hanya untuk demo.',
  fields: [{ id: 'text', label: 'Teks / angka terenkripsi', value: 'RSA ok' }, { id: 'p', label: 'p (prima)', value: '1009' }, { id: 'q', label: 'q (prima)', value: '1013' }, { id: 'e', label: 'e', value: '65537' }],
  actions: [
    { label: 'Lihat Kunci', run: async v => { const k = keys(v); return `n = ${k.n}\nphi(n) = ${k.phi}\nPublik (e,n) = (${k.e}, ${k.n})\nPrivat d = ${k.d}`; } },
    { label: 'Enkripsi', run: async v => { const k = keys(v); return [...v.text].map(c => modpow(BigInt(c.codePointAt(0)), k.e, k.n)).join(' '); } },
    { label: 'Dekripsi', run: async v => { const k = keys(v); return v.text.trim().split(/\s+/).map(x => String.fromCodePoint(Number(modpow(BigInt(x), k.d, k.n)))).join(''); } },
  ],
};
