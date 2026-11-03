import { modpow } from '../../core/utils.js';
const P = 2147483647n, G = 16807n; // demo kecil
export default {
  tab: 'Pertukaran Kunci', name: 'Pertukaran Kunci (Diffie-Hellman)',
  desc: 'Dua pihak menyepakati kunci rahasia lewat kanal terbuka. p=2147483647, g=16807 (demo kecil).',
  fields: [{ id: 'a', label: 'Kunci privat Alice', value: '12345' }, { id: 'b', label: 'Kunci privat Bob', value: '67890' }],
  actions: [{ label: 'Hitung', run: async v => {
    const a = BigInt(v.a), b = BigInt(v.b), A = modpow(G, a, P), B = modpow(G, b, P);
    return `Publik Alice A = g^a mod p = ${A}\nPublik Bob   B = g^b mod p = ${B}\nRahasia Alice = B^a mod p = ${modpow(B, a, P)}\nRahasia Bob   = A^b mod p = ${modpow(A, b, P)}`;
  } }],
};
