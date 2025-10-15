(() => {
  const refs = {
    menu: document.querySelector('[data-menu]'),
    openBtn: document.querySelector('[data-menu-open]'),
    closeBtn: document.querySelector('[data-menu-close]'),
    links: document.querySelectorAll('.menu-nav-link'),
  };

  const toggleMenu = () => {
    const isOpen = refs.menu.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (refs.openBtn) refs.openBtn.addEventListener('click', toggleMenu);
  if (refs.closeBtn) refs.closeBtn.addEventListener('click', toggleMenu);

  refs.links.forEach(link => {
    link.addEventListener('click', () => {
      refs.menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
})();
