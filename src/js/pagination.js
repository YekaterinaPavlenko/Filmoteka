import refs from './refs.js';
import MovieApiService from './apiService.js';
import addPaginationMarkup from './pagenationMarkup.js';

const movieApiService = new MovieApiService();

addPaginationMarkup();
const pagingItems = document.querySelectorAll('.js-page-number');
refs.pagingList.addEventListener('click', updateMarkupByPages);
// console.log(event.target);
function updateMarkupByPages(event) {
  event.preventDefault();
  console.log(event.target);
  console.dir(event.target);
  // if(event.target)
}
