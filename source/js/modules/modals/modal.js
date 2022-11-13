const openModalButton = document.querySelector(['.main-header__button']);
const modalWindow = document.querySelector(['.modal']);

function openModalWindow() {
  openModalButton.addEventListener('click', () =>{
    modalWindow.classList.remove('is-closed');
  });
}

export {openModalWindow};
