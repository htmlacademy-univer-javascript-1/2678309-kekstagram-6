const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('#picture-cancel');

function renderComments(comments) {
  socialComments.innerHTML = '';
  comments.forEach((comment) => {
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
}

function openFullSize(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeFullSize() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function onCancelButtonClick() {
  closeFullSize();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeFullSize();
  }
}

cancelButton.addEventListener('click', onCancelButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export { openFullSize };

