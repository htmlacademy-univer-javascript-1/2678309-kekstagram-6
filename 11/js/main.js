import { drawMiniature } from './drawMiniature.js';
import { loadPhotos } from './api.js';
import { showErrorMessage } from './message.js';
import './form.js';

loadPhotos()
  .then((photos) => {
    drawMiniature(photos);
  })
  .catch(() => {
    showErrorMessage();
  });
