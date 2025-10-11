import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createBookModal(book) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "book-modal";

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn" aria-label="Close modal">
        <svg width="16" height="16">
          <use href="./src/img/icons-modal.svg#icon-close"></use>
        </svg>
      </button>

      <div class="modal-body">
        <img src="${book.book_image || ''}" alt="${book.title}" class="book-image"/>

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

        <div class="accordion">
          <div class="accordion-item">
            <button class="accordion-header">
              Details
              <svg class="accordion-icon" width="14" height="8">
                <use href="./src/img/icons-modal.svg#icon-down"></use>
              </svg>
            </button>
            <div class="accordion-body">${book.details || 'No details available'}</div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              Shipping
              <svg class="accordion-icon" width="14" height="8">
                <use href="./src/img/icons-modal.svg#icon-down"></use>
              </svg>
            </button>
            <div class="accordion-body">${book.shipping || 'No shipping info available'}</div>
          </div>

          <div class="accordion-item">
            <button class="accordion-header">
              Returns
              <svg class="accordion-icon" width="14" height="8">
                <use href="./src/img/icons-modal.svg#icon-down"></use>
              </svg>
            </button>
            <div class="accordion-body">${book.returns || 'No return policy available'}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return modal;
}

export async function openBookModal(bookId) {
  try {
    const res = await fetch(`https://books-backend.p.goit.global/books/${bookId}`);
    const book = await res.json();

    const modal = createBookModal(book);
    document.body.appendChild(modal);

    new Accordion(modal.querySelector(".accordion"), {
      duration: 300,
      showMultiple: false,
    });

    document.body.style.overflow = "hidden";
    modal.style.display = "flex";

    const closeBtn = modal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => closeModal(modal));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
    document.addEventListener("keydown", onEscClose);

    function onEscClose(e) {
      if (e.key === "Escape") {
        closeModal(modal);
      }
    }

    function closeModal(modal) {
      modal.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEscClose);
    }

    const qtyInput = modal.querySelector(".bookQty");
    modal.querySelector(".increaseQty").addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    modal.querySelector(".decreaseQty").addEventListener("click", () => {
      if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    modal.querySelector(".addToCart").addEventListener("click", () => {
      console.log(`Додано до кошика: ${qtyInput.value} шт.`);
      iziToast.success({
        title: "Успіх",
        message: `Додано до кошика: ${qtyInput.value} шт.`,
        position: "topRight",
        timeout: 2500,
      });
    });

    modal.querySelector(".buyNow").addEventListener("click", (e) => {
      e.preventDefault();
      iziToast.info({
        title: "Покупка",
        message: "Дякуємо за покупку",
        position: "topRight",
        timeout: 2500,
      });
    });

    const accordion = modal.querySelector(".accordion");
    accordion.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (!header) return;

      const iconUse = header.querySelector(".accordion-icon use");
      const body = header.nextElementSibling;

      setTimeout(() => {
        if (body && body.offsetHeight > 0) {
          iconUse.setAttribute("href", "./src/img/icons-modal.svg#icon-above");
        } else {
          iconUse.setAttribute("href", "./src/img/icons-modal.svg#icon-down");
        }
      }, 310);
    });

  } catch (err) {
    console.error("Error fetching book:", err);
    iziToast.error({
      title: "Помилка",
      message: "Не вдалося завантажити книгу",
      position: "topRight",
      timeout: 2500,
    });
  }
}
