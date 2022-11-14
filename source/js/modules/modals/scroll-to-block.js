const anchorElement = document.querySelector('.intro__button');
const feedbackBlock = document.querySelector('#feedback');


function onAnchorButtonClick(evt) {
  evt.preventDefault();
  feedbackBlock.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function scrollToBlock() {
  anchorElement.addEventListener('click', onAnchorButtonClick);
}

export {scrollToBlock};
