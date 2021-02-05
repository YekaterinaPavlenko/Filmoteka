import refs from './refs.js';
import addPaginationMarkup from './pagenationMarkup.js';

addPaginationMarkup();
const pagingItems = document.querySelectorAll('.js-page-number');

const maxPages = 1000;

function removeTextContentBtn() {
  for (let i = 1; i < pagingItems.length - 1; i += 1) {
    pagingItems[i].textContent = '';
  }
}

function setCurrentColor(event) {
  event.preventDefault();

  if (event.target.classList.contains('js-current-number-page_Btn')) {
    event.target.classList.remove('js-current-number-page_Btn');
  } else {
    event.target.classList.add('js-current-number-page_Btn');
  }
}

export default setCurrentColor;
