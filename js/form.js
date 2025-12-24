import { MAX_HASHTAGS, HASHTAG_REGEXP, MAX_COMMENT_LENGTH, FILE_TYPES, DEFAULT_IMAGE_NAME } from './constants.js';
import { openModal, closeModal, stopEscPropagation } from './utils.js';
import { resetEffects, resetScale, activeOverlay } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendPhoto } from './api.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const previewImage = overlay.querySelector('.img-upload__preview img');
const effectsPreviews = overlay.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
});

function getHashtags(value) {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function validateHashtagsCount(value) {
  return getHashtags(value).length <= MAX_HASHTAGS;
}

function validateHashtagsUnique(value) {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
}

function validateHashtagsFormat(value) {
  return getHashtags(value).every((tag) => HASHTAG_REGEXP.test(tag));
}

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(hashtagInput, validateHashtagsCount, `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тегов`);
pristine.addValidator(hashtagInput, validateHashtagsUnique, 'Хэш-теги не должны повторяться');
pristine.addValidator(hashtagInput, validateHashtagsFormat, 'Хэш-тег должен начинаться с # и содержать только буквы и цифры');
pristine.addValidator(commentInput, validateComment, `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`);

function blockSubmit() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем';
}

function unblockSubmit() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmit();

  const formData = new FormData(form);

  sendPhoto(formData)
    .then(() => {
      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      unblockSubmit();
    });
}

function handleFileChange() {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const fileTypeCheck = FILE_TYPES.some((el) => fileName.endsWith(el));
  if (!fileTypeCheck) {
    showErrorMessage();
    fileInput.value = '';
  }

  const imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;

  effectsPreviews.forEach((preview) => { preview.style.backgroundImage =  `url(${imageUrl})`; });
  openForm();
}

function handleCancelClick() {
  closeForm();
}

function handleDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (activeOverlay) {
      return;
    }
    closeForm();
  }
}

function openForm() {
  openModal(overlay, handleDocumentKeydown);
}

function closeForm() {
  form.reset();
  pristine.reset();
  fileInput.value = '';
  previewImage.src = DEFAULT_IMAGE_NAME;
  effectsPreviews.forEach((preview) => { preview.style.backgroundImage =  ''; });
  resetEffects();
  resetScale();
  closeModal(overlay, handleDocumentKeydown);
}

fileInput.addEventListener('change', handleFileChange);
cancelButton.addEventListener('click', handleCancelClick);
hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);
form.addEventListener('submit', handleFormSubmit);
