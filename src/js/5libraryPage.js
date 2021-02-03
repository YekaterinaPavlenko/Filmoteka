'use strict';
import refs from './refs';
import cards from '../templates/cardsLibrary.hbs';

refs.homeBtn.addEventListener('click', mainPage);
refs.libraryBtnRef.addEventListener('click', library);
refs.queueBtnRef.addEventListener('click', queue);
refs.watchedBtnRef.addEventListener('click', watched);

function mainPage() {
  refs.searchForm.classList.remove('is-hidden');
  refs.watchedBtnRef.classList.add('is-hidden');
  refs.queueBtnRef.classList.add('is-hidden');
  refs.headerRef.classList.remove('bcg-libr');
  refs.libraryBtnRef.classList.remove('current');
  refs.homeBtn.classList.add('current');
  refs.gallery.classList.remove('gallery-bgr');
}
function library() {
  refs.searchForm.classList.add('is-hidden');
  refs.watchedBtnRef.classList.remove('is-hidden');
  refs.queueBtnRef.classList.remove('is-hidden');
  refs.headerRef.classList.add('bcg-libr');
  refs.libraryBtnRef.classList.add('current');
  refs.homeBtn.classList.remove('current');
  // gallery - bgr;
}
function queue() {
  refs.watchedBtnRef.classList.remove('orange');
  refs.queueBtnRef.classList.add('orange');
}
function watched() {
  refs.watchedBtnRef.classList.add('orange');
  refs.queueBtnRef.classList.remove('orange');
}

// logo
refs.logoBtn.addEventListener('click', mainPage);

///library-watched

refs.libraryBtnRef.addEventListener('click', showWatched);
refs.watchedBtnRef.addEventListener('click', showWatched);
refs.queueBtnRef.addEventListener('click', event => {
  cleanGallery();
  const localStr = localStorage.getItem('filmsQueue');
  const parse = JSON.parse(localStr);
  if (localStr === null || parse.length === 0) {
    refs.gallery.classList.add('gallery-bgr');
    refs.gallery.insertAdjacentHTML('beforeend', addText());
  } else refs.gallery.classList.remove('gallery-bgr');

  for (let item of parse) {
    fetchItem(item).then(movie => {
      renderItems(movie);
    });
  }
});

function renderItems(movie) {
  const markup = cards(movie);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function fetchItem(item) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${item}?api_key=c2406e33bae3c04a8fdebb618c81ede7`,
  ).then(response => response.json());
}

function showWatched() {
  cleanGallery();
  const localStr = localStorage.getItem('filmsWatched');
  const parse = JSON.parse(localStr);
  if (localStr === null || parse.length === 0) {
    refs.gallery.classList.add('gallery-bgr');
    refs.gallery.insertAdjacentHTML('beforeend', addText());
  } else refs.gallery.classList.remove('gallery-bgr');
  for (let item of parse) {
    fetchItem(item).then(movie => {
      renderItems(movie);
    });
  }
}

function cleanGallery() {
  refs.gallery.innerHTML = '';
}
function addText() {
  return `<p class="empty-library">You have not chosen a movie<br/><a href="#" class="choose">Choose now</a></p>`;
}
