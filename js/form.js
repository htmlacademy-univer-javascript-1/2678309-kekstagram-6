import { MAX_HASHTAGS, HASHTAG_REGEXP, MAX_COMMENT_LENGTH } from './constants.js';
import { openModal, closeModal, stopEscPropagation } from './functions.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
});

function validateHashtags(value) {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const unique = new Set(hashtags);
  if (unique.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((tag) => HASHTAG_REGEXP.test(tag));
}

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(hashtagInput, validateHashtags, 'Некорректные хэш-теги');
pristine.addValidator(commentInput, validateComment, `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`);

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    closeForm();
  }
}

function handleFileChange() {
  openForm();
}

function handleCancelClick() {
  closeForm();
}

function handleDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
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
  closeModal(overlay, handleDocumentKeydown);
}

fileInput.addEventListener('change', handleFileChange);
cancelButton.addEventListener('click', handleCancelClick);
hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);
form.addEventListener('submit', handleFormSubmit);
