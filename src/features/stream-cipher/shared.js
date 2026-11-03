import { dec, enc, hex, unhex, xor } from '../../core/utils.js';
/** Aksi untuk stream cipher: plaintext di-XOR dengan keystream(key, panjang). */
export const streamActions = keystream => [
  { label: 'Enkripsi', run: async v => { const b = enc.encode(v.text); return hex(xor(b, await keystream(v.key, b.length))); } },
  { label: 'Dekripsi', run: async v => { const b = unhex(v.text.trim()); return dec.decode(xor(b, await keystream(v.key, b.length))); } },
];
