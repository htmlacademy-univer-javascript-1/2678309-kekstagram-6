import { generatePhotos } from './data.js';
import { drawMiniature } from './drawMiniature.js';
import './form.js';

const photos = generatePhotos();
drawMiniature(photos);
