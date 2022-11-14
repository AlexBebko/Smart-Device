const moreButtonElement = document.querySelector('.about__button');
const moreTextElement = document.querySelector('.about__text--more');

function onMoreButtonClick() {
  if (moreTextElement.classList.contains('is-closed')) {
    moreTextElement.classList.remove('is-closed');
    moreButtonElement.innerHTML = 'Свернуть';
  } else {
    moreTextElement.classList.add('is-closed');
    moreButtonElement.innerHTML = 'Подробнее';
  }
}

function openMoreText() {
  moreButtonElement.addEventListener('click', onMoreButtonClick);
}

export {openMoreText};
