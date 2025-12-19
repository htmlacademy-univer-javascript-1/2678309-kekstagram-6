function showMessage(templateId, onClose) {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const message = template.querySelector('section');

  document.body.append(message);

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);

    if (onClose) {
      onClose();
    }
  }

  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(`.${message.className}__inner`)) {
      closeMessage();
    }
  }

  message.querySelector('button').addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
}

function showSuccessMessage() {
  showMessage('#success');
}

function showErrorMessage(onClose) {
  showMessage('#error', onClose);
}

export { showSuccessMessage, showErrorMessage };
