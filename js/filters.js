import { debounce } from './utils.js';
import { drawMiniature } from './drawMiniature.js';
import { RANDOM_COUNT, DEBOUNCE_TIME } from './constants.js';

const filtersBlock = document.querySelector('.img-filters');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussedBtn = document.querySelector('#filter-discussed');

function setActiveButton(button) {
  document
    .querySelectorAll('.img-filters__button')
    .forEach((btn) => btn.classList.remove('img-filters__button--active'));

  button.classList.add('img-filters__button--active');
}

const filterDefault = (photos) => [...photos];
const filterRandom = (photos) =>[...photos].slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_COUNT);
const filterDiscussed = (photos) => [...photos].slice().sort((a, b) => b.comments.length - a.comments.length);

export function initFilters(photos) {
  filtersBlock.classList.remove('img-filters--inactive');

  const renderDebounced = debounce(drawMiniature, DEBOUNCE_TIME);

  defaultBtn.addEventListener('click', () => {
    setActiveButton(defaultBtn);
    renderDebounced(filterDefault(photos));
  });

  randomBtn.addEventListener('click', () => {
    setActiveButton(randomBtn);
    renderDebounced(filterRandom(photos));
  });

  discussedBtn.addEventListener('click', () => {
    setActiveButton(discussedBtn);
    renderDebounced(filterDiscussed(photos));
  });
}
