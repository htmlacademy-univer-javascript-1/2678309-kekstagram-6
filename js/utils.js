export function openModal(modalElement, onEsc) {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);
}

export function closeModal(modalElement, onEsc) {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEsc);
}

export function stopEscPropagation(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

export function resetScale() {
  const scaleValue = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');

  scaleValue.value = '100%';
  previewImage.style.transform = 'scale(1)';
}

export function resetEffects() {
  const previewImage = document.querySelector('.img-upload__preview img');
  const effectNone = document.querySelector('#effect-none');
  const slider = document.querySelector('.effect-level');

  effectNone.checked = true;
  previewImage.style.filter = 'none';
  slider.classList.add('hidden');
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}
