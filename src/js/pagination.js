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
refs.pagingList.addEventListener('click', setNumberOfPageBtn);
refs.pagingList.addEventListener('click', updateMarkupByPages);

const maxPages = 1000;
let currentNunberOfPage;
function setNumberOfPageBtn(event) {
  event.preventDefault();
  if (event.target.textContent <= 5) {
    console.log(firstBtn);
    refs.pagingList.innerHTML = '';
    addPaginationMarkup();
    // firstBtn.textContent = 1;
    // secondBtn.textContent = 2;
    // thirdBtn.textContent = 3;
    // fourthBtn.textContent = 4;
    // fifthBtn.textContent = 5;
    // sixthBtn.textContent = 6;
    // seventhBtn.textContent = 7;
    // eightBtn.textContent = '';
    // eightBtn.classList.add('three-dots');
  } else if (
    event.target.textContent > 5 &&
    event.target.textContent < maxPages - 4
  ) {
    // console.log(pagingItems.length);
    let currentNumberOfPageBtn = event.target.textContent;
    console.log(currentNumberOfPageBtn);
    for (let i = 0; i < pagingItems.length; i += 1) {
      // console.log(pagingItems[i].textContent);
      // refs.pagingList.innerHTML = '';
      pagingItems[i].textContent = '';
    }
    firstBtn.textContent = 1;
    secondBtn.textContent = '';
    secondBtn.classList.add('three-dots');
    thirdBtn.textContent = +currentNumberOfPageBtn - 2;
    fourthBtn.textContent = +currentNumberOfPageBtn - 1;
    fifthBtn.textContent = +currentNumberOfPageBtn;
    sixthBtn.textContent = +currentNumberOfPageBtn + 1;
    seventhBtn.textContent = +currentNumberOfPageBtn + 2;
    // firstBtn.textContent = 1;
    // secondBtn.textContent = '';
    // secondBtn.classList.add('three-dots');
    // thirdBtn.textContent = +event.target.textContent - 2;
    // fourthBtn.textContent = +event.target.textContent - 1;
    // fifthBtn.textContent = +event.target.textContent;
    // sixthBtn.textContent = +event.target.textContent + 1;
    // seventhBtn.textContent = +event.target.textContent + 2;
  }
}
function updateMarkupByPages(event) {
  event.preventDefault();
  //   console.log(event.currentTarget);
  //   console.log(event.target.classList);
  // console.dir(event.currentTarget.children);
  if (event.target.classList.value.includes('js-page-number')) {
    movieApiService.page = +event.target.textContent;
    // console.log(event.target.classList.value);
    // console.log(event.currentTarget.children);

    // pagingItems.classList.value.remove('js-current-page');
    event.target.classList.add('js-current-page');
    // console.log(movieApiService.page);
  }
}
