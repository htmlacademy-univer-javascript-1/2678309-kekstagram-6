import { generatePhotos } from './data.js';
import { drawMiniature } from './drawMiniature.js';

const photos = generatePhotos();
drawMiniature(photos);
