function makeMaskForPhoneInputs() {
  const phoneInputElements = document.querySelectorAll('[data-phone-input]');

  for (let phoneInput of phoneInputElements) {
    for (let ev of ['input', 'blur', 'focus', 'keydown', 'click']) {
      phoneInput.addEventListener(ev, makeMask);
    }
  }
}


function makeMask(evt) {
  const el = evt.target;
  const clearVal = el.dataset.phoneInputClear;
  const pattern = el.dataset.phoneInput;
  const matrixDef = '+7(___) ___-__-__';
  const matrix = pattern ? pattern : matrixDef;
  let i = 0;
  const definition = matrix.replace(/\D/g, '');
  let elementValue = el.value.replace(/\D/g, '').replace(/^78/, '7');
  const CURSOR_START_POSITION = 3;

  if (clearVal !== 'false' && evt.type === 'blur' || evt.type === 'keydown') {
    if (elementValue.length < matrix.match(/([\_\d])/g).length) {
      evt.target.setCustomValidity('Введите номер телефона в формате +7 (999) 999-99-99');
      return;
    } else {
      evt.target.setCustomValidity('');
    }
  }

  if (el.selectionStart < CURSOR_START_POSITION) {
    el.setSelectionRange(CURSOR_START_POSITION, CURSOR_START_POSITION);
  }

  if (definition.length >= elementValue.length) {
    elementValue = definition;
  }
  el.value = matrixDef.replace(/./g, function (char) {
    if (/[_\d]/.test(char) && i < elementValue.length) {
      return elementValue.charAt(i++);
    }
    return i >= elementValue.length ? '' : char;
  });
}

export {makeMaskForPhoneInputs};
