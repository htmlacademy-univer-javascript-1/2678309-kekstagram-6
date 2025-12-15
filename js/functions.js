function openModal(modalElement, onEsc) {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);
}

function closeModal(modalElement, onEsc) {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEsc);
}

function stopEscPropagation(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

export { openModal, closeModal, stopEscPropagation };
