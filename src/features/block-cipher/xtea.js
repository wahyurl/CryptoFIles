import { textKeyFields } from '../../core/fields.js';
import { blockActions } from './shared.js';
const DELTA = 0x9e3779b9;
const encryptBlock = ([a, b], k) => { let s = 0; for (let i = 0; i < 32; i++) { a = (a + ((((b << 4) ^ (b >>> 5)) + b) ^ (s + k[s & 3]))) >>> 0; s = (s + DELTA) >>> 0; b = (b + ((((a << 4) ^ (a >>> 5)) + a) ^ (s + k[(s >>> 11) & 3]))) >>> 0; } return [a, b]; };
const decryptBlock = ([a, b], k) => { let s = 0xC6EF3720; for (let i = 0; i < 32; i++) { b = (b - ((((a << 4) ^ (a >>> 5)) + a) ^ (s + k[(s >>> 11) & 3]))) >>> 0; s = (s - DELTA) >>> 0; a = (a - ((((b << 4) ^ (b >>> 5)) + b) ^ (s + k[s & 3]))) >>> 0; } return [a, b]; };
export default {
  tab: 'XTEA', name: 'XTEA',
  desc: 'Penyempurnaan TEA untuk menutup kelemahan key schedule. Blok 64 bit, kunci 128 bit, 32 putaran Feistel.',
  fields: textKeyFields, actions: blockActions(encryptBlock, decryptBlock),
};
