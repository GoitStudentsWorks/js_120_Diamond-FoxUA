import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const eventButtons = document.querySelectorAll(".event-btn");
const backdrop = document.querySelector("#modal-backdrop");
const body = document.body;

eventButtons.forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.event));
});

function openModal(eventName) {
  const modalMarkup = `
    <div class="modal">
      <button type="button" class="modal-close" aria-label="Close modal">
        <svg width="24" height="24">
         <use href="/src/img/icons.svg#close"></use>
        </svg>
      </button>
      <h2 class="modal-title">Register</h2>
      <h3 class="event-title">${eventName}</h3>
      <form class="modal-form" id="register-form">
        <label>
          Name*
          <input type="text" name="name" placeholder="Eva" required />
        </label>
        <label>
          Email*
          <input type="email" name="email" placeholder="hello@booksy.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" placeholder="Type your message..."></textarea>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  `;

  backdrop.innerHTML = modalMarkup;
  backdrop.classList.add("is-open");
  body.classList.add("no-scroll");

  const closeBtn = backdrop.querySelector(".modal-close");
  const form = backdrop.querySelector("#register-form");

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onEscKey);
  form.addEventListener("submit", onFormSubmit);
}

function closeModal() {
  backdrop.classList.remove("is-open");
  body.classList.remove("no-scroll");
  backdrop.innerHTML = "";

  window.removeEventListener("keydown", onEscKey);
  backdrop.removeEventListener("click", onBackdropClick);
}

function onBackdropClick(e) {
  if (e.target === backdrop) closeModal();
}

function onEscKey(e) {
  if (e.key === "Escape") closeModal();
}

function onFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();

  if (!name || !email) {
    iziToast.warning({
      message: "Please fill in all required fields!",
      position: "topRight",
      timeout: 2500,
    });
    return;
  }

  iziToast.success({
    message: "Registration successful!",
    position: "topRight",
    timeout: 2500,
  });

  closeModal();
}