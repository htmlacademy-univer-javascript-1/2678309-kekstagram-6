import { BASE_URL, ROUTES } from './constants.js';

async function loadPhotos() {
  return fetch(`${BASE_URL}${ROUTES.GET_PHOTOS}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить фотографии');
      }
      return response.json();
    });
}

async function sendPhoto(formData) {
  return fetch(`${BASE_URL}${ROUTES.SEND_PHOTO}`, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }
    });
}

export { loadPhotos, sendPhoto };
