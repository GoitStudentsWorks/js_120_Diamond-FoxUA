// Знаходимо елементи
const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('.menu-nav-link');

// Функція блокування скролу сторінки
const toggleBodyScroll = (disable) => {
  if (document.body) {
    document.body.style.overflow = disable ? 'hidden' : '';
  }
};

// Відкриття меню
if (openBtn && menu) {
  openBtn.addEventListener('click', () => {
    menu.classList.add('is-open');
    menu.removeAttribute('hidden');
    toggleBodyScroll(true);


    openBtn.style.display = 'none';
  });
}

const closeMenu = () => {
  if (!menu) return;
  menu.classList.remove('is-open');
  menu.setAttribute('hidden', '');
  toggleBodyScroll(false);

  if (openBtn) openBtn.style.display = 'flex';
};


if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}


if (menu) {
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });
}


menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
