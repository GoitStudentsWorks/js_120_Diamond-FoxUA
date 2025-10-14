import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const modal = document.querySelector('[data-book-modal]');
const modalCloseBtn = document.querySelector('[data-book-modal-close]');
const backdrop = document.querySelector('[data-book-modal-backdrop]');

let currentBookData = null;

// Refs для елементів модального вікна
const modalRefs = {
  image: document.querySelector('[data-book-image]'),
  title: document.querySelector('[data-book-title]'),
  author: document.querySelector('[data-book-author]'),
  price: document.querySelector('[data-book-price]'),
  quantityInput: document.querySelector('[data-book-quantity]'),
  quantityDecrease: document.querySelector('[data-quantity-decrease]'),
  quantityIncrease: document.querySelector('[data-quantity-increase]'),
  addToCartBtn: document.querySelector('[data-add-to-cart]'),
  buyNowBtn: document.querySelector('[data-buy-now]'),
  detailsContent: document.querySelector('[data-details-content]'),
  shippingContent: document.querySelector('[data-shipping-content]'),
  returnsContent: document.querySelector('[data-returns-content]'),
  form: document.querySelector('[data-book-form]'),
};

// Функція для відкриття модального вікна
export function openBookModal(bookData) {
  currentBookData = bookData;

  // Заповнюємо модальне вікно даними
  modalRefs.image.src = bookData.book_image || '';
  modalRefs.image.alt = bookData.title || 'Book cover';
  modalRefs.title.textContent = bookData.title || 'Unknown Title';
  modalRefs.author.textContent = bookData.author || 'Unknown Author';
  modalRefs.price.textContent = `$${bookData.price || '0.00'}`;

  // Заповнюємо контент акордеонів
  modalRefs.detailsContent.textContent =
    bookData.description || 'No description available.';
  modalRefs.shippingContent.textContent =
    'Standard shipping: 5-7 business days. Express shipping available.';
  modalRefs.returnsContent.textContent =
    '30-day return policy. Books must be in original condition.';

  // Скидаємо кількість
  modalRefs.quantityInput.value = 1;

  // Відкриваємо модалку
  backdrop.classList.add('is-open');
  document.body.classList.add('modal-open');

  // Додаємо слухачі подій
  addEventListeners();
}

// Функція для закриття модального вікна
function closeBookModal() {
  backdrop.classList.remove('is-open');
  document.body.classList.remove('modal-open');

  // Видаляємо слухачі подій
  removeEventListeners();

  // Закриваємо всі акордеони
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.classList.remove('active');
  });
}

// Обробник для кнопки закриття
function handleCloseClick() {
  closeBookModal();
}

// Обробник для backdrop
function handleBackdropClick(event) {
  if (event.target === backdrop) {
    closeBookModal();
  }
}

// Обробник для клавіші Escape
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeBookModal();
  }
}

// Обробник для зміни кількості
function handleQuantityDecrease() {
  const currentValue = parseInt(modalRefs.quantityInput.value);
  if (currentValue > 1) {
    modalRefs.quantityInput.value = currentValue - 1;
  }
}

function handleQuantityIncrease() {
  const currentValue = parseInt(modalRefs.quantityInput.value);
  if (currentValue < 99) {
    modalRefs.quantityInput.value = currentValue + 1;
  }
}

// Обробник для додавання до кошика
function handleAddToCart(event) {
  event.preventDefault();

  const quantity = parseInt(modalRefs.quantityInput.value);

  console.log('Added to cart:', {
    book: currentBookData.title,
    author: currentBookData.author,
    price: currentBookData.price,
    quantity: quantity,
    total: (currentBookData.price * quantity).toFixed(2),
  });

  iziToast.success({
    title: 'Success',
    message: `Added ${quantity} book(s) to cart!`,
    backgroundColor: '#4caf50',
    titleColor: '#ffffff',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 3000,
    progressBar: false,
  });
}

// Обробник для покупки
function handleBuyNow(event) {
  event.preventDefault();

  const quantity = parseInt(modalRefs.quantityInput.value);

  iziToast.success({
    title: 'Дякуємо за покупку!',
    message: `Ви придбали ${quantity} книг(у) "${currentBookData.title}"`,
    backgroundColor: '#4caf50',
    titleColor: '#ffffff',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 4000,
    progressBar: false,
  });

  setTimeout(() => {
    closeBookModal();
  }, 1500);
}

// Обробник акордеону
function handleAccordionClick(event) {
  const accordionButton = event.target.closest('.accordion-button');
  if (!accordionButton) return;

  const accordionItem = accordionButton.closest('.accordion-item');
  const isActive = accordionItem.classList.contains('active');

  // Закриваємо всі акордеони
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.classList.remove('active');
  });

  // Відкриваємо поточний, якщо він не був активним
  if (!isActive) {
    accordionItem.classList.add('active');
  }
}

// Додаємо слухачі подій
function addEventListeners() {
  modalCloseBtn.addEventListener('click', handleCloseClick);
  backdrop.addEventListener('click', handleBackdropClick);
  document.addEventListener('keydown', handleEscapeKey);
  modalRefs.quantityDecrease.addEventListener('click', handleQuantityDecrease);
  modalRefs.quantityIncrease.addEventListener('click', handleQuantityIncrease);
  modalRefs.addToCartBtn.addEventListener('click', handleAddToCart);
  modalRefs.buyNowBtn.addEventListener('click', handleBuyNow);

  // Акордеон
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.addEventListener('click', handleAccordionClick);
  });
}

// Видаляємо слухачі подій
function removeEventListeners() {
  modalCloseBtn.removeEventListener('click', handleCloseClick);
  backdrop.removeEventListener('click', handleBackdropClick);
  document.removeEventListener('keydown', handleEscapeKey);
  modalRefs.quantityDecrease.removeEventListener(
    'click',
    handleQuantityDecrease
  );
  modalRefs.quantityIncrease.removeEventListener(
    'click',
    handleQuantityIncrease
  );
  modalRefs.addToCartBtn.removeEventListener('click', handleAddToCart);
  modalRefs.buyNowBtn.removeEventListener('click', handleBuyNow);
}
