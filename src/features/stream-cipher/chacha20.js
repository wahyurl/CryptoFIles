import { sha } from '../../core/utils.js';
import { textKeyFields } from '../../core/fields.js';
import { streamActions } from './shared.js';
const rotl = (v, n) => ((v << n) | (v >>> (32 - n))) >>> 0;
const keystream = async (k, n) => {
  const key = new DataView((await sha(k)).buffer), nonce = new DataView((await sha('nonce' + k)).slice(0, 12).buffer);
  const out = new Uint8Array(Math.ceil(n / 64) * 64);
  for (let ctr = 0; ctr * 64 < n; ctr++) {
    const s = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574];
    for (let i = 0; i < 8; i++) s.push(key.getUint32(i * 4, true)); s.push(ctr);
    for (let i = 0; i < 3; i++) s.push(nonce.getUint32(i * 4, true));
    const x = s.slice(), q = (a, b, c, d) => { x[a] = (x[a] + x[b]) >>> 0; x[d] = rotl(x[d] ^ x[a], 16); x[c] = (x[c] + x[d]) >>> 0; x[b] = rotl(x[b] ^ x[c], 12); x[a] = (x[a] + x[b]) >>> 0; x[d] = rotl(x[d] ^ x[a], 8); x[c] = (x[c] + x[d]) >>> 0; x[b] = rotl(x[b] ^ x[c], 7); };
    for (let r = 0; r < 10; r++) { q(0, 4, 8, 12); q(1, 5, 9, 13); q(2, 6, 10, 14); q(3, 7, 11, 15); q(0, 5, 10, 15); q(1, 6, 11, 12); q(2, 7, 8, 13); q(3, 4, 9, 14); }
    const dv = new DataView(out.buffer, ctr * 64); for (let i = 0; i < 16; i++) dv.setUint32(i * 4, (x[i] + s[i]) >>> 0, true);
  }
  return out.slice(0, n);
};
export default { tab: 'ChaCha20', name: 'ChaCha20', desc: 'Stream cipher modern berbasis operasi ARX (add-rotate-xor), 20 putaran, kunci 256 bit. Nonce diturunkan otomatis dari kunci (demo).', fields: textKeyFields, actions: streamActions(keystream) };
