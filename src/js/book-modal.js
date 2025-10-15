import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const backdrop = document.querySelector('#books-modal-backdrop');
const body = document.body;

export async function openBookModal(bookId) {
  try {
    const res = await fetch(
      `https://books-backend.p.goit.global/books/${bookId}`
    );
    const book = await res.json();

    const modalMarkup = `
      <div class="modal">
        <button type="button" class="close-btn" aria-label="Close modal">
          <svg width="16" height="16">
            <use href="../img/icons-modal.svg#icon-close"></use>
          </svg>
        </button>
        <div class="modal-body">
          <img src="${book.book_image || ''}" alt="${book.title}" class="book-image"/>
          <div class="modal-content">
            <h2 class="book-title">${book.title || 'No title'}</h2>
            <p class="book-author">${book.author || 'Unknown author'}</p>
            <p class="book-price">${book.price ? `$${book.price}` : 'N/A'}</p>

            <form class="quantity-form">
              <button type="button" class="decreaseQty">-</button>
              <input type="number" class="bookQty" value="1" min="1" />
              <button type="button" class="increaseQty">+</button>
            </form>

            <div class="buttons">
              <button type="button" class="addToCart">Add To Cart</button>
              <button type="submit" class="buyNow">Buy Now</button>
            </div>
          </div>
        </div>

        <div class="accordion-container">
          <div class="ac">
            <h2 class="ac-header">
              <button class="ac-trigger">
                Details
                <svg class="accordion-icon" width="14" height="8">
                  <use href="./img/icons-modal.svg#icon-down"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p>${book.details || 'No details available'}</p>
            </div>
          </div>

          <div class="ac">
            <h2 class="ac-header">
              <button class="ac-trigger">
                Shipping
                <svg class="accordion-icon" width="14" height="8">
                  <use href="./img/icons-modal.svg#icon-down"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p>${book.shipping || 'No shipping info available'}</p>
            </div>
          </div>

          <div class="ac">
            <h2 class="ac-header">
              <button class="ac-trigger">
                Returns
                <svg class="accordion-icon" width="14" height="8">
                  <use href="./img/icons-modal.svg#icon-down"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p>${book.returns || 'No return policy available'}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    backdrop.innerHTML = modalMarkup;
    backdrop.classList.add('is-open');
    body.classList.add('no-scroll');

    const modal = backdrop.querySelector('.modal');
    const closeBtn = modal.querySelector('.close-btn');

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onEscKey);

    function closeModal() {
      backdrop.classList.remove('is-open');
      body.classList.remove('no-scroll');
      backdrop.innerHTML = '';
      window.removeEventListener('keydown', onEscKey);
      backdrop.removeEventListener('click', onBackdropClick);
    }

    function onBackdropClick(e) {
      if (e.target === backdrop) closeModal();
    }

    function onEscKey(e) {
      if (e.key === 'Escape') closeModal();
    }

    const qtyInput = modal.querySelector('.bookQty');
    modal.querySelector('.increaseQty').addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    modal.querySelector('.decreaseQty').addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1)
        qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    modal.querySelector('.addToCart').addEventListener('click', () => {
      console.log(`Додано до кошика: ${qtyInput.value} шт.`);
      iziToast.success({
        title: 'Успіх',
        message: `Додано до кошика: ${qtyInput.value} шт.`,
        position: 'topRight',
        timeout: 2500,
      });
    });

    modal.querySelector('.buyNow').addEventListener('click', e => {
      e.preventDefault();
      iziToast.info({
        title: 'Покупка',
        message: 'Дякуємо за покупку',
        position: 'topRight',
        timeout: 2500,
      });
      setTimeout(() => {
        closeModal();
      }, 2500);
    });

    new Accordion(modal.querySelector('.accordion-container'), {
      duration: 300,
      showMultiple: true,
    });

  } catch (err) {
    console.error('Error fetching book:', err);
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити книгу',
      position: 'topRight',
      timeout: 2500,
    });
  }
}
