import refs from './refs.js';
import addPaginationMarkup from './pagenationMarkup.js';
import { forwardOnePage, backOnePage } from './homePage.js';

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

refs.pagingList.addEventListener('click', setNumberOfPageBtn);
refs.pagingList.addEventListener('click', setCurrentColor);
refs.pagingList.addEventListener('click', setNumbsOfPagesByArrows);
backPageBtn.addEventListener('click', backOnePage);
forwardPageBtn.addEventListener('click', forwardOnePage);

const maxPages = 1000;

let currentNumberOfPageBtn = 1;
function setNumberOfPageBtn(event) {
  event.preventDefault();
  if (event.target.nodeName == 'SPAN') {
    if (event.target.textContent <= 5) {
      currentNumberOfPageBtn = +event.target.textContent;
      removeTextContentBtn();
      secondBtn.classList.remove('three-dots');
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
      console.log(currentNumberOfPageBtn);
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
}

function removeTextContentBtn() {
  for (let i = 1; i < pagingItems.length - 1; i += 1) {
    pagingItems[i].textContent = '';
  }
}

let beforePage;
let afterPageNumb;
function setCurrentColor(event) {
  event.preventDefault();
  if (event.target.nodeName === 'SPAN') {
    if (
      event.target.textContent <= 5 ||
      event.target.textContent >= maxPages - 4
    ) {
      for (let i = 0; i < pagingItems.length; i += 1) {
        pagingItems[i].classList.remove('js-current-number-page_Btn');
      }
      event.target.classList.add('js-current-number-page_Btn');
    }
    if (
      event.target.textContent > 5 &&
      event.target.textContent < maxPages - 4
    ) {
      for (let i = 0; i < pagingItems.length; i += 1) {
        pagingItems[i].classList.remove('js-current-number-page_Btn');
      }
      fifthBtn.classList.add('js-current-number-page_Btn');
    }
  } else if (event.target === backPageBtn) {
    // backPageBtn.classList.remove('js-current-number-page_Btn');
    for (let i = 0; i < pagingItems.length; i += 1) {
      backPageBtn.classList.remove('js-current-number-page_Btn');
      if (
        pagingItems[i].classList.value.includes('js-current-number-page_Btn')
      ) {
        beforePage = +pagingItems[i].textContent - 1;
        // console.log(beforePage);
        pagingItems[i].classList.remove('js-current-number-page_Btn');
      }
    }
    for (let i = 0; i < pagingItems.length; i += 1) {
      if (+pagingItems[i].textContent == beforePage && beforePage >= 1) {
        pagingItems[i].classList.add('js-current-number-page_Btn');
      } else if (beforePage < 1) {
        firstBtn.classList.add('js-current-number-page_Btn');
      }
    }
  } else if (event.target === forwardPageBtn) {
    for (let i = 0; i < pagingItems.length; i += 1) {
      if (pagingItems[i].className.includes('js-current-number-page_Btn')) {
        afterPageNumb = +pagingItems[i].textContent + 1;
        // console.log(afterPageNumb);
        pagingItems[i].classList.remove('js-current-number-page_Btn');
      }
    }
    for (let i = 0; i < pagingItems.length - 1; i += 1) {
      // console.log(afterPageNumb);
      if (
        pagingItems[i].textContent.includes(afterPageNumb) &&
        afterPageNumb <= maxPages
      ) {
        pagingItems[i].classList.add('js-current-number-page_Btn');
      }
    }
  }
}

function setNumbsOfPagesByArrows(event) {
  event.preventDefault();
  let currentPage;
  for (let i = 0; i < pagingItems.length; i += 1) {
    if (pagingItems[i].classList.value.includes('js-current-number-page_Btn')) {
      currentPage = +pagingItems[i].textContent;
    }
  }
  if (currentPage <= 5) {
    removeTextContentBtn();
    secondBtn.classList.remove('three-dots');
    secondBtn.textContent = 2;
    thirdBtn.textContent = 3;
    fourthBtn.textContent = 4;
    fifthBtn.textContent = 5;
    sixthBtn.textContent = 6;
    seventhBtn.textContent = 7;
    eightBtn.textContent = '';
    eightBtn.classList.add('three-dots');
  } else if (currentPage > 5 && currentPage < maxPages - 4) {
    removeTextContentBtn();
    secondBtn.textContent = '';
    secondBtn.classList.add('three-dots');
    thirdBtn.textContent = +currentPage - 2;
    fourthBtn.textContent = +currentPage - 1;
    fifthBtn.textContent = +currentPage;
    sixthBtn.textContent = +currentPage + 1;
    seventhBtn.textContent = +currentPage + 2;
    eightBtn.classList.add('three-dots');
  }
  console.log(currentPage);
}
