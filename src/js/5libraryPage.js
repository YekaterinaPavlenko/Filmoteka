'use strict';
import refs from './refs';
import cards from '../templates/cardsLibrary.hbs';
const libraryBtnRef = document.querySelector('.js-my-library-button');
const watchedBtnRef = document.querySelector('.watched-show-btn');
const queueBtnRef = document.querySelector('.queue-show-btn');

const headerRef = document.querySelector('.header');

// const naviBtnRef = document.querySelector('.header-navigation_list');

// naviBtnRef.addEventListener('click', event => {
//   console.dir(event.target);
//   refs.searchForm.classList.toggle('is-hidden');
//   watchedBtnRef.classList.toggle('is-hidden');
//   queueBtnRef.classList.toggle('is-hidden');
// });
refs.homeBtn.addEventListener('click', mainPage);

function mainPage() {
  refs.searchForm.classList.remove('is-hidden');
  watchedBtnRef.classList.add('is-hidden');
  queueBtnRef.classList.add('is-hidden');
  headerRef.classList.remove('bcg-libr');
}

libraryBtnRef.addEventListener('click', () => {
  refs.searchForm.classList.add('is-hidden');
  watchedBtnRef.classList.remove('is-hidden');
  queueBtnRef.classList.remove('is-hidden');
  headerRef.classList.add('bcg-libr');
});

queueBtnRef.addEventListener('click', () => {
  watchedBtnRef.classList.remove('orange');
  queueBtnRef.classList.add('orange');
});

watchedBtnRef.addEventListener('click', () => {
  watchedBtnRef.classList.add('orange');
  queueBtnRef.classList.remove('orange');
});

// logo
refs.logoBtn.addEventListener('click', mainPage);

///library-watched
let films = [];
libraryBtnRef.addEventListener('click', event => {
  refs.gallery.innerHTML = '';
  const localStr = localStorage.getItem('filmsWatched');
  const parse = JSON.parse(localStr);

  for (let item of parse) {
    fetch(
      `https://api.themoviedb.org/3/movie/${item}?api_key=c2406e33bae3c04a8fdebb618c81ede7`,
    )
      .then(response => response.json())
      .then(movie => {
        films.push(movie);
        const markup = cards(movie);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
      });
  }
});
