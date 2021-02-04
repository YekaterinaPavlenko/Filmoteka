import refs from './refs.js';
// import MovieApiService from './apiService.js';
import addPaginationMarkup from './pagenationMarkup.js';
// import {updateMarkupByPages} from './homePage.js';

// const movieApiService = new MovieApiService();

addPaginationMarkup();
const pagingItems = document.querySelectorAll('.js-page-number');
const backPageBtn = document.querySelector('.js-move-left');
const forwardPageBtn = document.querySelector('.js-move-right');
const secondBtn = document.getElementById('pag2');
const thirdBtn = document.getElementById('pag3');
const fourthBtn = document.getElementById('pag4');
const fifthBtn = document.getElementById('pag5');
const sixthBtn = document.getElementById('pag6');
const seventhBtn = document.getElementById('pag7');
const eightBtn = document.getElementById('pag8');

refs.pagingList.addEventListener('click', setNumberOfPageBtn);
refs.pagingList.addEventListener('click', setCurrentColor);
// backPageBtn.addEventListener('click', backOnePage);
// forwardPageBtn.addEventListener('click', forwardOnePage);

const maxPages = 1000;
let currentNumberOfPageBtn = 1;
function setNumberOfPageBtn(event) {
  event.preventDefault();
  if (event.target.textContent <= 5) {
    currentNumberOfPageBtn = event.target.textContent;
    removeTextContentBtn();
    secondBtn.textContent = 2;
    thirdBtn.textContent = 3;
    fourthBtn.textContent = 4;
    fifthBtn.textContent = 5;
    sixthBtn.textContent = 6;
    seventhBtn.textContent = 7;
    eightBtn.textContent = '';
    eightBtn.classList.add('three-dots');
  } else if (
    event.target.textContent > 5 &&
    event.target.textContent < maxPages - 4
  ) {
    currentNumberOfPageBtn = event.target.textContent;
    removeTextContentBtn();
    secondBtn.textContent = '';
    secondBtn.classList.add('three-dots');
    thirdBtn.textContent = +currentNumberOfPageBtn - 2;
    fourthBtn.textContent = +currentNumberOfPageBtn - 1;
    fifthBtn.textContent = +currentNumberOfPageBtn;
    sixthBtn.textContent = +currentNumberOfPageBtn + 1;
    seventhBtn.textContent = +currentNumberOfPageBtn + 2;
    eightBtn.classList.add('three-dots');
  } else if (event.target.textContent >= maxPages - 4) {
    currentNumberOfPageBtn = event.target.textContent;
    removeTextContentBtn();
    secondBtn.classList.add('three-dots');
    thirdBtn.textContent = maxPages - 6;
    fourthBtn.textContent = maxPages - 5;
    fifthBtn.textContent = maxPages - 4;
    sixthBtn.textContent = maxPages - 3;
    seventhBtn.textContent = maxPages - 2;
    eightBtn.classList.remove('three-dots');
    eightBtn.textContent = maxPages - 1;
  }
}

function removeTextContentBtn() {
  for (let i = 1; i < pagingItems.length - 1; i += 1) {
    pagingItems[i].textContent = '';
  }
}

function setCurrentColor(event) {
  event.preventDefault();
  if (
    event.target.textContent <= 5 ||
    event.target.textContent >= maxPages - 4
  ) {
    for (let i = 0; i < pagingItems.length; i += 1) {
      pagingItems[i].classList.remove('js-current-number-page_Btn');
    }
    event.target.classList.add('js-current-number-page_Btn');
  }
  if (event.target.textContent > 5 && event.target.textContent < maxPages - 4) {
    for (let i = 0; i < pagingItems.length; i += 1) {
      pagingItems[i].classList.remove('js-current-number-page_Btn');
    }
    fifthBtn.classList.add('js-current-number-page_Btn');
  }
}

// function backOnePage(event) {
//   if (event.target.textContent > 1) {
//     event.preventDefault();
//     currentNumberOfPageBtn = +event.target.textContent - 1;
//     setNumberOfPageBtn(event);
//     setCurrentColor(event);
//   }
//   return;
// }
