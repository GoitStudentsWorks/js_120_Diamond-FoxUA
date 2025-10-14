import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { openBookModal } from './book-modal.js';

const BASE_URL = 'https://books-backend.p.goit.global';
const CATEGORY_LIST = '/books/category-list';
const TOP_BOOKS = '/books/top-books';
const BOOKS_BY_CATEGORY = '/books/category';
const BOOK_DETAILS = '/books/';
const ITEMS_PER_PAGE_MOBILE = 10;
const ITEMS_PER_PAGE_TABLET_DESKTOP = 24;

const refs = {
  categoryToggleBtn: document.querySelector('[data-category-list-toggle]'),
  categoryMenuContainer: document.querySelector('[data-category-list]'),
  categoryListElement: document.querySelector('.books-categories-list'),
  booksContainer: document.querySelector('.js-books-list'),
  showMoreBtn: document.querySelector('.books-show-more-btn'),
  booksShowingCount: document.querySelector('.books-showing-count'),
};

let categories = [];
let activeCategory = 'All categories';
let currentTotalBooks = [];
let currentPage = 0;
let currentBooksDisplayed = 0;

function getBooksLimit() {
  if (window.innerWidth < 768) {
    return ITEMS_PER_PAGE_MOBILE;
  } else {
    return ITEMS_PER_PAGE_TABLET_DESKTOP;
  }
}

async function fetchData(url, options = {}) {
  try {
    const { data } = await axios(url, options);
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      titleColor: '#ffffff',
      message: `Request failed: <u>${error.message}</u>`,
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

// ---  API Services ---
async function serviceCategoryList() {
  const data = await fetchData(`${BASE_URL}${CATEGORY_LIST}`);
  return data.map(category => category.list_name);
}

async function serviceTopBooks() {
  const data = await fetchData(`${BASE_URL}${TOP_BOOKS}`);
  return data.flatMap(item => item.books);
}

async function serviceBooksByCategory(categoryName) {
  const params = { category: categoryName };
  return await fetchData(`${BASE_URL}${BOOKS_BY_CATEGORY}`, {
    params,
  });
}

async function serviceBookDetails(bookId) {
  const data = await fetchData(`${BASE_URL}${BOOK_DETAILS}${bookId}`);
  console.log(`Book details for ID ${bookId}:`, data);
  return data;
}

// --- Markup Functions ---
function createMarkupCategoryList(arr) {
  const allCategoriesLink = `
    <li class="books-categories-item">
      <a href="#" class="books-categories-list-link ${
        activeCategory === 'All categories' ? 'active' : ''
      }">All categories</a>
    </li>
  `;

  const categoryItems = arr
    .filter(name => name !== 'All categories')
    .map(
      name => `
        <li class="books-categories-item">
          <a href="#" class="books-categories-list-link ${
            name === activeCategory ? 'active' : ''
          }">${name}</a>
        </li>
      `
    )
    .join('');

  return allCategoriesLink + categoryItems;
}

function createMarkupBooks(arr) {
  if (arr.length === 0) {
    return '<li class="no-books-message">No books found for this category.</li>';
  }
  return arr
    .map(
      ({ book_image, title, author, price, _id }) => `
        <li class="books-card" data-book-id="${_id}">
            <img class="books-card-img" src="${book_image}" alt="${title}"/>
            <div class="books-info">
                <div class="books-info-left">
                   <h4 class="books-h section-subtitle">${title}</h4>
                   <p class="books-text">${author}</p>
                   
                </div>
                <p class="books-price-text">$${price}</p>
            </div>
            <button class="learn-more-btn" type="button" data-book-modal-open data-book-id="${_id}">Learn more</button>
        </li>
    `
    )
    .join('');
}

// --- Render Functions ---
function renderCategories() {
  refs.categoryListElement.innerHTML = createMarkupCategoryList(categories);

  refs.categoryListElement
    .querySelectorAll('.books-categories-list-link')
    .forEach(link => {
      link.addEventListener('click', handleCategoryClick);
    });
}

async function renderBooks() {
  refs.booksContainer.innerHTML = '';
  refs.showMoreBtn.classList.add('show-more-hidden');

  if (activeCategory === 'All categories') {
    currentTotalBooks = await serviceTopBooks();
  } else {
    currentTotalBooks = await serviceBooksByCategory(activeCategory);
  }

  currentPage = 0;
  currentBooksDisplayed = 0;
  displayBooksPortion();
}

function displayBooksPortion(limit = getBooksLimit()) {
  const startIndex = currentPage * limit;
  const endIndex = Math.min(startIndex + limit, currentTotalBooks.length);
  const booksToDisplay = currentTotalBooks.slice(startIndex, endIndex);

  refs.booksContainer.insertAdjacentHTML(
    'beforeend',
    createMarkupBooks(booksToDisplay)
  );

  currentBooksDisplayed = endIndex;

  refs.booksShowingCount.textContent = `Showing ${currentBooksDisplayed} of ${currentTotalBooks.length}`;

  currentPage++;

  if (currentBooksDisplayed < currentTotalBooks.length) {
    refs.showMoreBtn.classList.remove('show-more-hidden');
  } else {
    refs.showMoreBtn.classList.add('show-more-hidden');
  }
}

// --- Event Handlers ---
function toggleCategory() {
  const isOpen = refs.categoryMenuContainer.classList.toggle('is-open');
  refs.categoryToggleBtn.classList.toggle('is-open');

  if (isOpen) {
    updateCategoryThumb();
  }
}

async function handleCategoryClick(event) {
  event.preventDefault();

  const newActiveCategory = event.target.textContent;

  if (activeCategory === newActiveCategory) {
    refs.categoryMenuContainer.classList.remove('is-open');
    refs.categoryToggleBtn.classList.remove('is-open');
    return;
  }

  activeCategory = newActiveCategory;
  renderCategories();
  await renderBooks();

  refs.categoryMenuContainer.classList.remove('is-open');
  refs.categoryToggleBtn.classList.remove('is-open');
}

async function handleLearnMoreClick(event) {
  const learnMoreBtn = event.target.closest('.learn-more-btn');
  if (learnMoreBtn) {
    const bookId = learnMoreBtn.dataset.bookId;

    if (bookId) {
      try {
        const bookDetails = await serviceBookDetails(bookId);
        openBookModal(bookDetails);
      } catch (error) {
        alert('Failed to load book details. Please try again later.');
        console.error('Failed to show book details:', error);
      }
    }
  }
}

async function onShowMore() {
  refs.showMoreBtn.disabled = true;

  try {
    displayBooksPortion(4);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to load books: ${error.message}`,
      backgroundColor: '#ef4040',
      titleColor: '#fff',
      messageColor: '#fff',
      position: 'topRight',
    });
  } finally {
    refs.showMoreBtn.disabled = false;
  }
}

// --- Initialization ---
async function initializeApp() {
  categories = await serviceCategoryList();

  if (!categories.includes('All categories')) {
    categories = ['All categories', ...categories];
  }

  renderCategories();

  refs.categoryToggleBtn.firstChild.textContent = 'Categories ';

  await renderBooks();

  let prevBooksLimit = getBooksLimit();

  window.addEventListener('resize', () => {
    const newLimit = getBooksLimit();
    if (newLimit !== prevBooksLimit) {
      prevBooksLimit = newLimit;

      refs.booksContainer.innerHTML = '';
      currentPage = 0;
      currentBooksDisplayed = 0;
      displayBooksPortion(newLimit);
    }
  });
}

// --- Scrollbar ---

const categoryList = refs.categoryListElement;
const categoryThumb = document.querySelector(
  '.books-categories-scrollbar-thumb'
);

function updateCategoryThumb() {
  const { scrollTop, scrollHeight, clientHeight } = categoryList;

  const ratio = clientHeight / scrollHeight;
  const thumbHeight = Math.max(ratio * clientHeight, 24);
  const maxTop = clientHeight - thumbHeight;
  const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop || 0;

  categoryThumb.style.height = thumbHeight + 'px';
  categoryThumb.style.top = top + 'px';
}

categoryList.addEventListener('scroll', updateCategoryThumb);
window.addEventListener('resize', updateCategoryThumb);
updateCategoryThumb();

let isDragging = false;
let startY = 0;
let startScrollTop = 0;

categoryThumb.addEventListener('mousedown', e => {
  isDragging = true;
  startY = e.clientY;
  startScrollTop = categoryList.scrollTop;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const { scrollHeight, clientHeight } = categoryList;
  const maxScroll = scrollHeight - clientHeight;
  const thumbHeight = categoryThumb.offsetHeight;
  const maxThumbTop = clientHeight - thumbHeight;

  const deltaY = e.clientY - startY;
  const scrollDelta = (deltaY / maxThumbTop) * maxScroll;

  categoryList.scrollTop = startScrollTop + scrollDelta;
  updateCategoryThumb();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.userSelect = '';
});

// --- Event Listeners ---
refs.categoryToggleBtn.addEventListener('click', toggleCategory);
refs.booksContainer.addEventListener('click', event => {
  const learnMoreBtn = event.target.closest('.learn-more-btn');
  if (!learnMoreBtn) return;

  learnMoreBtn.blur();

  handleLearnMoreClick(event);
});
refs.showMoreBtn.addEventListener('click', onShowMore);

window.addEventListener('click', function (event) {
  if (
    !refs.categoryToggleBtn.contains(event.target) &&
    !refs.categoryMenuContainer.contains(event.target)
  ) {
    refs.categoryMenuContainer.classList.remove('is-open');
    refs.categoryToggleBtn.classList.remove('is-open');
  }
});

document.addEventListener('DOMContentLoaded', initializeApp);
