import refs from './refs.js';
import MovieApiService from './apiService.js';
import addPaginationMarkup from './pagenationMarkup.js';

const movieApiService = new MovieApiService();

addPaginationMarkup();
const pagingItems = document.querySelectorAll('.js-page-number');

refs.pagingList.addEventListener('click', updateMarkupByPages);

function updateMarkupByPages(event) {
  event.preventDefault();
  //   console.log(event.currentTarget);
  //   console.log(event.target.classList);
  console.dir(event.currentTarget.children);
  if (event.target.classList.value.includes('js-page-number')) {
    movieApiService.page = +event.target.textContent;
    // console.log(event.target.classList.value);
    console.log(event.currentTarget.children);

    // pagingItems.classList.value.remove('js-current-page');
    event.target.classList.add('js-current-page');
    console.log(movieApiService.page);
  }
}
