import { enc } from '../../core/utils.js';
import { textKeyFields } from '../../core/fields.js';
import { streamActions } from './shared.js';
const keystream = async (k, n) => {
  const S = [...Array(256).keys()], kb = enc.encode(k); let j = 0;
  for (let i = 0; i < 256; i++) { j = (j + S[i] + kb[i % kb.length]) & 255; [S[i], S[j]] = [S[j], S[i]]; }
  let i = 0; j = 0; const o = new Uint8Array(n);
  for (let t = 0; t < n; t++) { i = (i + 1) & 255; j = (j + S[i]) & 255; [S[i], S[j]] = [S[j], S[i]]; o[t] = S[(S[i] + S[j]) & 255]; }
  return o;
};
export default { tab: 'RC4', name: 'RC4', desc: 'Keystream dari permutasi 256 byte (KSA + PRGA), di-XOR dengan plaintext.', fields: textKeyFields, actions: streamActions(keystream) };
