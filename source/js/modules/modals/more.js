const moreButtonElement = document.querySelector('[data-hidden-text-button]');
const moreTextElement = document.querySelector('.about__text--more');


function onMoreButtonClick() {
  if (moreTextElement.classList.contains('is-closed')) {
    moreTextElement.classList.remove('is-closed');
    moreButtonElement.textContent = 'Свернуть';
  } else {
    moreTextElement.classList.add('is-closed');
    moreButtonElement.textContent = 'Подробнее';
  }
}

function openMoreText() {
  moreButtonElement.addEventListener('click', onMoreButtonClick);
}

export {openMoreText};
