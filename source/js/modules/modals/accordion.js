const accordionButtonElement = document.querySelectorAll('.main-footer__accordion-button');
const accordionElement = document.querySelectorAll('.main-footer__accordion-container');

function accordionWorking() {

  if (accordionElement) {

    accordionElement.forEach((element) => {
      element.classList.remove('no-js');
      element.classList.remove('is-opened');
      element.classList.add('is-closed');
    });
  }

  if (accordionButtonElement) {

    accordionButtonElement.forEach((item) => {
      item.addEventListener('click', () => {
        const parent = item.parentNode;

        if (parent.classList.contains('is-closed')) {

          accordionElement.forEach((child) => {
            child.classList.remove('is-opened');
            child.classList.add('is-closed');
          });

          parent.classList.remove('is-closed');
          parent.classList.add('is-opened');
        } else {
          parent.classList.remove('is-opened');
          parent.classList.add('is-closed');
        }

      });
    });
  }
}

export {accordionWorking};
