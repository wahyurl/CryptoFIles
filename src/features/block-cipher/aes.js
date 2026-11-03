import { dec, enc, hex, sha, unhex } from '../../core/utils.js';
import { textKeyFields } from '../../core/fields.js';
const getKey = async (k, usage) => crypto.subtle.importKey('raw', await sha(k), 'AES-GCM', false, [usage]);
export default {
  tab: 'AES-256-GCM', name: 'AES-256-GCM',
  desc: 'Standar enkripsi modern berbasis jaringan substitusi-permutasi (SPN), blok 128 bit. Memakai Web Crypto API; kunci diturunkan dari SHA-256 passphrase, IV acak 12 byte.',
  fields: textKeyFields,
  actions: [
    { label: 'Enkripsi', run: async v => { const iv = crypto.getRandomValues(new Uint8Array(12)); const c = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await getKey(v.key, 'encrypt'), enc.encode(v.text))); return hex(iv) + hex(c); } },
    { label: 'Dekripsi', run: async v => { const b = unhex(v.text.trim()); return dec.decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, await getKey(v.key, 'decrypt'), b.slice(12))); } },
  ],
};
