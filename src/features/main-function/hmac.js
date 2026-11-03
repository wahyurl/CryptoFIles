import { enc, hex, unhex } from '../../core/utils.js';
const hmacKey = (k, usage) => crypto.subtle.importKey('raw', enc.encode(k), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
export default {
  tab: 'MAC', name: 'MAC (HMAC-SHA256)',
  desc: 'Autentikasi pesan dengan kunci rahasia bersama. Verifikasi memastikan pesan tidak diubah.',
  fields: [{ id: 'text', label: 'Pesan', value: 'Transfer 100' }, { id: 'key', label: 'Kunci', value: 'kunci-bersama' }, { id: 'mac', label: 'HMAC (untuk verifikasi)', value: '' }],
  actions: [
    { label: 'Hitung HMAC', run: async v => hex(new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(v.key, 'sign'), enc.encode(v.text)))) },
    { label: 'Verifikasi', run: async v => (await crypto.subtle.verify('HMAC', await hmacKey(v.key, 'verify'), unhex(v.mac.trim()), enc.encode(v.text))) ? 'VALID: pesan asli.' : 'TIDAK VALID: pesan/kunci berbeda.' },
  ],
};
