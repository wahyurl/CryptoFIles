import { sha } from '../../core/utils.js';
import { textKeyFields } from '../../core/fields.js';
import { streamActions } from './shared.js';
const keystream = async (k, n) => {
  const h = await sha(k); let s = (h[0] << 8 | h[1]) || 0xACE1; const o = new Uint8Array(n);
  for (let t = 0; t < n; t++) { let b = 0; for (let i = 0; i < 8; i++) { const f = (s ^ (s >> 2) ^ (s >> 3) ^ (s >> 5)) & 1; s = (s >> 1) | (f << 15); b = (b << 1) | (s & 1); } o[t] = b; }
  return o;
};
export default { tab: 'LFSR', name: 'LFSR 16-bit', desc: 'Linear Feedback Shift Register polinomial x^16+x^14+x^13+x^11+1 sebagai pembangkit keystream; seed dari hash kunci.', fields: textKeyFields, actions: streamActions(keystream) };
