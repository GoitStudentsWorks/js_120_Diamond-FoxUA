// book-modal.js

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const iconPath = new URL('/img/icons.svg', import.meta.url).href;

const BASE_URL = 'https://books-backend.p.goit.global';
const BOOK_DETAILS_ENDPOINT = '/books/';

// --- Референси на DOM-елементи модального вікна ---
// Важливо: Ці селектори мають відповідати тим, що в book-modal.html
const refs = {
  backdrop: document.querySelector('.js-book-modal-backdrop'),
  modal: document.querySelector('.js-book-modal'),
  closeBtn: document.querySelector('.js-book-modal-close-btn'),
  modalContent: document.querySelector('.js-book-modal-content'),
};

let currentBookData = null; // Зберігатиме дані поточної книги

// --- Функції для відкриття/закриття модального вікна ---
export async function openBookModal(bookId) {
  // Перевірка, чи знайдені елементи модального вікна
  if (!refs.backdrop || !refs.modal || !refs.closeBtn || !refs.modalContent) {
    iziToast.error({
      title: 'Error',
      message: 'Error loading modal window.',
      position: 'topRight',
      timeout: 4000,
    });
    return;
  }

  try {
    const bookDetails = await serviceBookDetails(bookId);
    currentBookData = bookDetails;
    renderBookDetails(bookDetails);

    // Ініціалізуємо Accordion після рендерингу контенту
    // Це має бути після того, як markup додано до DOM
    const accordionContainer = refs.modalContent.querySelector(
      '.book-details-accordion-container'
    );
    if (accordionContainer) {
      new Accordion(accordionContainer, {
        showMultiple: true,
      });
    }

    refs.backdrop.classList.add('is-open');
    refs.modal.classList.add('is-open');
    document.body.classList.add('no-scroll');

    // Додаємо слухачів подій для закриття
    refs.closeBtn.addEventListener('click', closeBookModal);
    refs.backdrop.addEventListener('click', onBackdropClick);
    document.addEventListener('keydown', onEscapeKeyPress);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Could not load book details. Please try again later.',
      position: 'topRight',
      timeout: 4000,
    });
  }
}

function closeBookModal() {
  if (!refs.backdrop || !refs.modal || !refs.closeBtn || !refs.modalContent) {
    return;
  }

  refs.backdrop.classList.remove('is-open');
  refs.modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');

  // Видаляємо слухачів подій
  refs.closeBtn.removeEventListener('click', closeBookModal);
  refs.backdrop.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscapeKeyPress);

  // Очищаємо вміст модалки
  refs.modalContent.innerHTML = '';
  currentBookData = null;
}

function onBackdropClick(event) {
  if (event.target === refs.backdrop) {
    closeBookModal();
  }
}

function onEscapeKeyPress(event) {
  if (event.key === 'Escape') {
    closeBookModal();
  }
}

// --- API Service для отримання деталей книги ---
async function fetchData(url, options = {}) {
  try {
    const { data } = await axios(url, options);
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      titleColor: '#ffffff',
      message: `The request failed: <u>${error.message}</u>`,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
      animateInside: true,
      progressBar: false,
      close: false,
      closeOnClick: true,
    });
    throw error;
  }
}

async function serviceBookDetails(bookId) {
  return await fetchData(`${BASE_URL}${BOOK_DETAILS_ENDPOINT}${bookId}`);
}

function renderBookDetails(book) {
  const markup = `
    <div class="book-modal-details-wrapper">
      <img class="book-modal-img" src="${book.book_image}" alt="${
    book.title
  }" loading="lazy"/>
      <div class="book-modal-info">
        <h2 class="book-modal-title">${book.title}</h2>
        <p class="book-modal-author">${book.author}</p>
       <p class="book-modal-price">$${
         book.price !== undefined && book.price !== null
           ? Number(book.price).toFixed(2)
           : 'The price is not specified.'
       }</p>

        <form class="book-modal-order-form">
          <div class="quantity-selector">
            <button type="button" class="quantity-btn" data-action="decrement">-</button>
            <input type="number" class="quantity-input" value="1" min="1" max="99" aria-label="Number of books" disabled>
            <button type="button" class="quantity-btn" data-action="increment">+</button>
          </div>
          <div class="book-modal-buttons">
            <button type="button" class="add-to-cart-btn" data-book-id="${
              book._id
            }">Add To Cart</button>
            <button type="submit" class="buy-now-btn" data-book-id="${
              book._id
            }">Buy Now</button>
          </div>
        </form>
        <div class="book-details-accordion-container">
      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Details
             <svg class="books-arrow-icon" width="24" height="24">
               <use href="${iconPath}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">${
            book.description || 'No additional information available..'
          }</p>
        </div>
      </div>

      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Shipping
            <svg class="books-arrow-icon" width="24" height="24">
               <use href="${iconPath}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.</p>
        </div>
      </div>

      <div class="ac">
        <h3 class="ac-header">
          <button type="button" class="ac-trigger">Returns
            <svg class="books-arrow-icon" width="24" height="24">
               <use href="${iconPath}#icon-arrow-dwn"></use>
             </svg>
          </button>
        </h3>
        <div class="ac-panel">
          <p class="ac-text">You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.</p>
        </div>
      </div>
    </div>

      </div>
       
   
    </div>
  `;

  refs.modalContent.innerHTML = markup;

  const orderForm = refs.modalContent.querySelector('.book-modal-order-form');
  if (orderForm) {
    orderForm.addEventListener('click', handleOrderFormClick);
    orderForm.addEventListener('submit', handleBuyNowSubmit);
  }
}

function handleOrderFormClick(event) {
  const target = event.target;
  const quantityInput = refs.modalContent.querySelector('.quantity-input');

  if (!quantityInput) return;

  let quantity = parseInt(quantityInput.value);

  if (target.dataset.action === 'decrement') {
    quantity = Math.max(1, quantity - 1);
  } else if (target.dataset.action === 'increment') {
    quantity = Math.min(99, quantity + 1);
  }
  quantityInput.value = quantity;

  if (target.classList.contains('add-to-cart-btn')) {
    target.disabled = true;

    (async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 4000));

        iziToast.success({
          title: 'Success!',
          message: `"${currentBookData.title}" (${quantity} pcs.) added to cart!`,
          position: 'topRight',
          timeout: 4000,
        });
      } catch (error) {
        iziToast.error({
          title: 'Error',
          message: 'Could not add to cart.',
          position: 'topRight',
        });
      } finally {
        target.disabled = false;
      }
    })();
  }
}

function handleBuyNowSubmit(event) {
  event.preventDefault();

  iziToast.success({
    message: 'Thank you for your purchase!',
    position: 'topRight',
    timeout: 4000,
  });

  closeBookModal();
}
