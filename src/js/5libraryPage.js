import refs from './refs';
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
refs.homeBtn.addEventListener('click', () => {
  refs.searchForm.classList.remove('is-hidden');
  watchedBtnRef.classList.add('is-hidden');
  queueBtnRef.classList.add('is-hidden');
  headerRef.classList.remove('bcg-libr');
});

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
