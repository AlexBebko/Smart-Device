import {isEscapeKey, isEnterKey} from '../../utils/is-key';

const bodyElement = document.querySelector('body');

const modalOpenButtonElement = document.querySelector('.main-header__button');
const modalWindow = document.querySelector('.modal');
const modalWindowElement = document.querySelector('.modal__wrapper');
const modalCloseButtonElement = document.querySelector('.modal__close-button');
const modalInputNameElement = modalWindow.querySelector('input');


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

function openModalWindow() {
  modalWindow.classList.remove('is-closed');
  bodyElement.classList.add('scroll-lock');
  modalInputNameElement.focus();

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
