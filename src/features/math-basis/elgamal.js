import { modpow } from '../../core/utils.js';
const P = 2147483647n, G = 16807n;
export default {
  tab: 'ElGamal', name: 'ElGamal (Logaritma Diskret)',
  desc: 'Keamanan bertumpu pada sulitnya logaritma diskret. p=2147483647, g=16807, kunci publik y = g^x mod p.',
  fields: [{ id: 'text', label: 'Teks / pasangan c1:c2', value: 'ElGamal ok' }, { id: 'x', label: 'Kunci privat x', value: '12345' }],
  actions: [
    { label: 'Enkripsi', run: async v => { const y = modpow(G, BigInt(v.x), P); return [...v.text].map(c => { const k = BigInt(1 + Math.floor(Math.random() * 1e9)); return `${modpow(G, k, P)}:${BigInt(c.codePointAt(0)) * modpow(y, k, P) % P}`; }).join(' '); } },
    { label: 'Dekripsi', run: async v => v.text.trim().split(/\s+/).map(t => { const [c1, c2] = t.split(':').map(BigInt), s = modpow(c1, BigInt(v.x), P); return String.fromCodePoint(Number(c2 * modpow(s, P - 2n, P) % P)); }).join('') },
  ],
};
