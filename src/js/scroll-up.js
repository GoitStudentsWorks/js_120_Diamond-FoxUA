const iconPath = new URL('/img/icons.svg', import.meta.url).href;

const scrollUpBtn = document.createElement('button');
scrollUpBtn.id = 'scrollUp';
scrollUpBtn.className = 'scroll-up';
scrollUpBtn.innerHTML = `
  <svg class="svg" width="30" height="30">
    <use href="${iconPath}#icon-right-arrow-alt"></use>
  </svg>
`;

document.body.appendChild(scrollUpBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
