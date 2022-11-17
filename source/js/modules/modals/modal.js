import {isEscapeKey, isEnterKey} from '../../utils/is-key';

const bodyElement = document.querySelector('body');

const modalOpenButtonElement = document.querySelector('[data-modal-opens-button]');
const modalWindow = document.querySelector('[data-modal-window]');
const modalWindowElement = document.querySelector('[data-modal-block]');
const modalCloseButtonElement = document.querySelector('[data-modal-close-button]');
const modalInputNameElement = modalWindow.querySelector('[data-modal-name-input]');

function onModalOpenButtonClick() {
  openModalWindow();
}

function onModalOpenButtonEnterKeydown(evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    openModalWindow();
  }
}

function onModalCloseButtonClick() {
  closeModalWindow();
}

function onModalWindowEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

function onOutsideModalClick(evt) {
  const isClickInside = modalWindowElement.contains(evt.target);

  if (!isClickInside) {
    closeModalWindow();
  }
}

function focusableModalWindow() {
  let focusableElementsString = 'a[href], input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  let focusableElements = modalWindowElement.querySelectorAll(focusableElementsString);

  focusableElements = Array.prototype.slice.call(focusableElements);

  let firstTabStop = focusableElements[0];
  let lastTabStop = focusableElements[focusableElements.length - 1];

  modalInputNameElement.focus();

  modalWindowElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 9) {
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          evt.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (document.activeElement === lastTabStop) {
          evt.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  });
}

function openModalWindow() {
  modalWindow.classList.remove('is-closed');
  bodyElement.classList.add('scroll-lock');


  focusableModalWindow();

  modalOpenButtonElement.removeEventListener('click', onModalOpenButtonClick);
  modalOpenButtonElement.removeEventListener('keydown', onModalOpenButtonEnterKeydown);

  modalCloseButtonElement.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalWindowEscapeKeydown);
  modalWindow.addEventListener('click', onOutsideModalClick);
}

function closeModalWindow() {
  modalWindow.classList.add('is-closed');
  bodyElement.classList.remove('scroll-lock');

  modalOpenButtonElement.addEventListener('click', onModalOpenButtonClick);
  modalOpenButtonElement.addEventListener('keydown', onModalOpenButtonEnterKeydown);

  modalCloseButtonElement.removeEventListener('click', onModalCloseButtonClick);
  document.removeEventListener('keydown', onModalWindowEscapeKeydown);
  modalWindow.removeEventListener('click', onOutsideModalClick);
}

function callEventListeners() {
  modalOpenButtonElement.addEventListener('click', onModalOpenButtonClick);
  modalOpenButtonElement.addEventListener('keydown', onModalOpenButtonEnterKeydown);
}

export {callEventListeners};
