export function drawMiniature(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const el = template.cloneNode(true);
    const pictureImage = el.querySelector('.picture__img');
    const pictureComments = el.querySelector('.picture__comments');
    const pictureLikes = el.querySelector('.picture__likes');

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments;
    pictureLikes.textContent = photo.likes;
    fragment.append(el);
  });
  picturesContainer.append(fragment);
}
