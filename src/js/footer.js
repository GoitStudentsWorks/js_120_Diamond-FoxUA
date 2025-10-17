import iziToast from "izitoast";

(function () {
  const container = document.querySelector('.form');
  if (!container) return;

  const input = container.querySelector('.join-input');
  const btn = container.querySelector('.join-btn');

  if (!input || !btn) return;

  let wrap = input.closest('.input-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'input-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
  }

  let err = wrap.querySelector('.join-error');
  if (!err) {
    err = document.createElement('p');
    err.className = 'join-error';
    err.textContent = 'Error text';
    wrap.appendChild(err);
  }

  btn.addEventListener('click', e => {
    e.preventDefault();
    wrap.classList.add('validated');

    if (!input.checkValidity()) {
      input.setAttribute('aria-invalid', 'true');
      input.reportValidity && input.reportValidity();
      input.focus();
    } else {
      input.setAttribute('aria-invalid', 'false');
      wrap.classList.remove('validated');
      input.value = '';
      input.blur();
      btn.blur();
      console.log('Форма успішно відправлена!');
      iziToast.success({
        message: 'Registration success'
      });
    }
  });

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (val === '' || input.checkValidity()) {
      input.setAttribute('aria-invalid', 'false');
      wrap.classList.remove('validated');
    }
  });
})();
