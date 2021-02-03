import refs from './refs.js';
import MovieApiService from './apiService.js';
import addPaginationMarkup from './pagenationMarkup.js';

const movieApiService = new MovieApiService();

addPaginationMarkup();
const pagingItems = document.querySelectorAll('.js-page-number');
const backPageBtn = document.querySelector('.js-move-left');
const forwardPageBtn = document.querySelector('.js-move-right');
const firstBtn = document.getElementById('pag1');
const secondBtn = document.getElementById('pag2');
const thirdBtn = document.getElementById('pag3');
const fourthBtn = document.getElementById('pag4');
const fifthBtn = document.getElementById('pag5');
const sixthBtn = document.getElementById('pag6');
const seventhBtn = document.getElementById('pag7');
const eightBtn = document.getElementById('pag8');
const ninthBtn = document.getElementById('pag9');

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
