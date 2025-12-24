export let activeOverlay = null;

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

export function showOverlay({ content, onButtonClick }) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '1000';

  document.body.append(overlay);
  overlay.append(content);

  activeOverlay = overlay;

  function close() {
    overlay.remove();
    activeOverlay = null;
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  }

  document.addEventListener('keydown', onEsc);

  overlay.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      close();
    }
  });

  const button = content.querySelector('button');
  if (button) {
    button.addEventListener('click', () => {
      if (onButtonClick) {
        onButtonClick();
      }
      close();
    });
  }
}

export function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
