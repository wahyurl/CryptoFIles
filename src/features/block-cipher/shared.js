import { dec, enc, hex, pad, sha, unhex, unpad } from '../../core/utils.js';
export const key16 = async k => { const h = await sha(k), dv = new DataView(h.buffer); return [0, 4, 8, 12].map(i => dv.getUint32(i, true)); };
const run8 = (b, f, k) => { const dv = new DataView(b.buffer); for (let i = 0; i < b.length; i += 8) { const r = f([dv.getUint32(i, true), dv.getUint32(i + 4, true)], k); dv.setUint32(i, r[0], true); dv.setUint32(i + 4, r[1], true); } return b; };
/** Aksi enkripsi/dekripsi untuk cipher blok 64 bit (mode ECB + padding PKCS7). */
export const blockActions = (encryptBlock, decryptBlock) => [
  { label: 'Enkripsi', run: async v => hex(run8(pad(enc.encode(v.text), 8), encryptBlock, await key16(v.key))) },
  { label: 'Dekripsi', run: async v => dec.decode(unpad(run8(unhex(v.text.trim()), decryptBlock, await key16(v.key)))) },
];
