import folders from './features/index.js';
import { renderStack } from './ui/render.js';
import { initScroll } from './ui/scroll.js';

const root = document.getElementById('stack');
renderStack(root, folders);
initScroll(root);
