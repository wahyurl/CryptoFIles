import { hex, sha } from '../../core/utils.js';
export default {
  tab: 'Fungsi Hash', name: 'Fungsi Hash',
  desc: 'Fungsi satu arah: pesan apa pun menjadi digest berukuran tetap (integritas data).',
  fields: [{ id: 'text', label: 'Pesan', value: 'Halo Kriptografi' }],
  actions: ['SHA-1', 'SHA-256', 'SHA-512'].map(alg => ({ label: alg, run: async v => hex(await sha(v.text, alg)) })),
};
