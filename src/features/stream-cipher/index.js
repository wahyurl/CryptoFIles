import rc4 from './rc4.js'; import lfsr from './lfsr.js'; import chacha20 from './chacha20.js';
export default { id: 'stream-cipher', title: 'Stream Cipher', subtitle: 'Enkripsi aliran kunci', color: '#0f7a63', files: [rc4, lfsr, chacha20] };
