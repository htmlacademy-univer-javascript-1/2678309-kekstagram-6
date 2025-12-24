import { drawMiniature } from './drawMiniature.js';
import { loadPhotos } from './api.js';
import { showLoadDataErrorMessage } from './message.js';
import { initFilters } from './filters.js';
import './form.js';

loadPhotos()
  .then((photos) => {
    drawMiniature(photos);
    initFilters(photos);
  })
  .catch((err) => {
    showLoadDataErrorMessage(err.message);
  });
