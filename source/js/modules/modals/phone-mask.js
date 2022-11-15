const phoneInputElements = document.querySelectorAll('[data-phone-input]');

for (let phoneInput of phoneInputElements) {
  for (let ev of ['input', 'blur', 'focus']) {
    phoneInput.addEventListener(ev, makeMask);
  }
}

function makeMask(evt) {
  const el = evt.target;
  const clearVal = el.dataset.phoneInputClear;
  const pattern = el.dataset.phoneInput;
  const matrixDef = '+7(___) ___-__-__';
  const matrix = pattern ? pattern : matrixDef;
  let i = 0;
  const def = matrix.replace(/\D/g, '');
  let val = evt.target.value.replace(/\D/g, '');

  if (clearVal !== 'false' && evt.type === 'blur') {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      evt.target.value = '';
      return;
    }
  }
  if (def.length >= val.length) {
    val = def;
  }
  evt.target.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  });
}

export {makeMask};
