import { COMMENTS_STEP } from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const commentCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('#picture-cancel');

let currentComments = [];
let shownComments = 0;

function renderNextComments() {
  const next = currentComments.slice(shownComments, shownComments + COMMENTS_STEP);

  next.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.className = 'social__comment';

    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    socialComments.appendChild(commentElement);
  });

  shownComments += next.length;
  commentCountBlock.textContent = `${shownComments} из ${currentComments.length} комментариев`;

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function onCancelButtonClick() {
  closeFullSize();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeFullSize();
  }
}

function addListeners() {
  commentsLoader.addEventListener('click', renderNextComments);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function removeListeners() {
  commentsLoader.removeEventListener('click', renderNextComments);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openFullSize(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';
  currentComments = photo.comments;
  shownComments = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  addListeners();
}

function closeFullSize() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeListeners();
}

export { openFullSize };
