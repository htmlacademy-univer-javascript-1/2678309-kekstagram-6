import { showOverlay } from './utils.js';

function showTemplateMessage(templateId) {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const section = template.querySelector('section');

  showOverlay({ content: section });
}

function showSuccessMessage() {
  showTemplateMessage('#success');
}

function showErrorMessage() {
  showTemplateMessage('#error');
}

function showLoadDataErrorMessage(message) {
  const box = document.createElement('div');

  box.style.backgroundColor = '#fff';
  box.style.padding = '24px 30px';
  box.style.borderRadius = '8px';
  box.style.maxWidth = '400px';
  box.style.textAlign = 'center';
  box.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';

  box.innerHTML = `
    <p style="margin: 0 0 20px; color: #555;">
      ${message}
    </p>
    <button style="
      padding: 10px 18px;
      border: none;
      border-radius: 4px;
      background-color: #ff4d4d;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    ">
      Обновить страницу
    </button>
  `;

  showOverlay({ content: box, onButtonClick: () => location.reload() });
}

export { showSuccessMessage, showErrorMessage, showLoadDataErrorMessage };
