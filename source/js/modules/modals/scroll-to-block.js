const anchorElement = document.querySelector('[data-scroll-to-form-button]');
const feedbackBlock = document.querySelector('#feedback');


function onAnchorButtonClick(evt) {
  evt.preventDefault();
  feedbackBlock.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function scrollToBlock() {
  if (anchorElement) {
    anchorElement.addEventListener('click', onAnchorButtonClick);
  }
}

export {scrollToBlock};
