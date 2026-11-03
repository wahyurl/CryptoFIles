import { textKeyFields } from '../../core/fields.js';
import { blockActions } from './shared.js';
const DELTA = 0x9e3779b9;
const encryptBlock = ([a, b], k) => { let s = 0; for (let i = 0; i < 32; i++) { s = (s + DELTA) >>> 0; a = (a + (((b << 4) + k[0]) ^ (b + s) ^ ((b >>> 5) + k[1]))) >>> 0; b = (b + (((a << 4) + k[2]) ^ (a + s) ^ ((a >>> 5) + k[3]))) >>> 0; } return [a, b]; };
const decryptBlock = ([a, b], k) => { let s = 0xC6EF3720; for (let i = 0; i < 32; i++) { b = (b - (((a << 4) + k[2]) ^ (a + s) ^ ((a >>> 5) + k[3]))) >>> 0; a = (a - (((b << 4) + k[0]) ^ (b + s) ^ ((b >>> 5) + k[1]))) >>> 0; s = (s - DELTA) >>> 0; } return [a, b]; };
export default {
  tab: 'TEA', name: 'TEA',
  desc: 'Tiny Encryption Algorithm: jaringan Feistel, blok 64 bit, kunci 128 bit, 32 putaran. Mode ECB + padding PKCS7.',
  fields: textKeyFields, actions: blockActions(encryptBlock, decryptBlock),
};
