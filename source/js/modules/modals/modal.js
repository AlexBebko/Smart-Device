import {isEscapeKey, isEnterKey} from '../../utils/is-key';

const bodyElement = document.querySelector('body');

const modalOpenButtonElement = document.querySelector('[data-modal-opens-button]');
const modalWindow = document.querySelector('[data-modal-window]');
const modalWindowElement = document.querySelector('[data-modal-block]');
const modalCloseButtonElement = document.querySelector('[data-modal-close-button]');
const modalInputNameElement = document.querySelector('[data-modal-name-input]');

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
  if (modalWindowElement) {
    let focusableElementsString = 'a[href], input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
    let focusableElements = modalWindowElement.querySelectorAll(focusableElementsString);
    let unfocusableElementsString = '[tabindex="-1"]';
    let unfocusableElements = modalWindowElement.querySelectorAll(unfocusableElementsString);

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
            if (lastTabStop.focus()) {
              unfocusableElements.tabIndex = 0;
            }
            evt.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    });
  }
}

function openModalWindow() {
  if (modalWindow) {
    modalWindow.classList.remove('is-closed');
    bodyElement.classList.add('scroll-lock');

    focusableModalWindow();

    modalOpenButtonElement.removeEventListener('click', onModalOpenButtonClick);
    modalOpenButtonElement.removeEventListener('keydown', onModalOpenButtonEnterKeydown);

    if (modalCloseButtonElement) {
      modalCloseButtonElement.addEventListener('click', onModalCloseButtonClick);
    }
    document.addEventListener('keydown', onModalWindowEscapeKeydown);
    modalWindow.addEventListener('click', onOutsideModalClick);
  }
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
  if (modalOpenButtonElement) {
    modalOpenButtonElement.addEventListener('click', onModalOpenButtonClick);
    modalOpenButtonElement.addEventListener('keydown', onModalOpenButtonEnterKeydown);
  }
}

export {callEventListeners};
