import { openFullSize } from './drawFullSize.js';

export function drawMiniature(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const el = template.cloneNode(true);
    const pictureLink = el.querySelector('.picture');
    const pictureImage = el.querySelector('.picture__img');
    const pictureComments = el.querySelector('.picture__comments');
    const pictureLikes = el.querySelector('.picture__likes');

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    pictureLink.addEventListener('click', (event) => {
      event.preventDefault();
      openFullSize(photo);
    });

    fragment.append(el);
  });
  picturesContainer.append(fragment);
}
