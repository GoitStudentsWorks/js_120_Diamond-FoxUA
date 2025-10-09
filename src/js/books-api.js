import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global';
const CATEGORY_LIST = '/books/category-list';
const TOP_BOOKS = '/books/top-books';
const BOOKS_BY_CATEGORY = '/books/category';
const BOOK_DETAILS = '/books/';

const container = document.querySelector('.js-books-list');
const loadBtn = document.querySelector('.js-load-more');
let page = 1;

loadBtn.addEventListener('click', onLoadMore);

async function serviceMovie() {
  const { data } = await axios(`${BASE_URL}${TOP_BOOKS}`);
  console.log(data);

  return data;
}

serviceMovie()
  .then(data => {
    container.insertAdjacentHTML('beforeend', createMarkup(data));
    // if (data.page < data.total_pages) {
    //   loadBtn.classList.replace('load-more-hidden', 'load-more');
    // }
  })
  .catch(error => {
    alert(error.message);
  });

function createMarkup(arr) {
  console.log(Array.isArray(arr));

  const allBooks = arr.flatMap(item => item.books);

  return allBooks
    .map(
      ({ book_image, title, author, price }) => `
        <li class="books-card">
            <img class="books-card-img" src= "${book_image}" alt="${title}"/>
            <div class="books-info">
                <div class="books-info-left">
                   <h4 class="books-h section-subtitle">${title}</h4>
                   <p>${author}</p>
                </div>
                <p class="books-price">$${price}</p>
            </div>
            <button class="learn-more-btn" type="button">Learn more</button>
        </li>
    `
    )
    .join('');
}

async function onLoadMore() {
  page += 1;
  loadBtn.disabled = true;

  try {
    const data = await serviceMovie(page);
    console.log(data);

    container.insertAdjacentHTML('beforeend', createMerkup(data.results));

    if (data.page >= data.total_pages) {
      loadBtn.classList.replace('load-more', 'load-more-hidden');
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loadBtn.disabled = false;
  }
}
