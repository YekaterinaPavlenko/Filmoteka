import refs from './refs';
import modalTpl from '../templates/detailsPage.hbs';
import MovieApiService from './apiService.js';
import { parse } from 'handlebars';

// const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

// console.log(refs.openModal);
// console.log(refs.modal);

refs.openModal.addEventListener('click', openModal);

let id;

function openModal(event) {
  event.preventDefault();
  // console.log(event.target);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  id = event.target.dataset.id;
  // console.log(id);
  refs.modalBox.classList.remove('is-hidden');
  fetchFilm(id);
  refs.openModal.removeEventListener('click', openModal);
  window.addEventListener('keydown', closeModal);
  refs.backdrop.addEventListener('click', closeModal);
}

function closeModal(e) {
  e.preventDefault();
  if (e.code == 'Escape' || e.target.classList.contains('js-backdrop')) {
    refs.modalBox.classList.add('is-hidden');
    refs.modalContent.innerHTML = '';
    window.removeEventListener('keydown', closeModal);
    refs.backdrop.removeEventListener('click', closeModal);
    refs.openModal.addEventListener('click', openModal);
    // console.log('close modal window');
  }
}

function fetchFilm(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(movie => {
      appendMarkup(movie);
    });
}

function appendMarkup(movie) {
  const modalContent = modalTpl(movie);
  refs.modalContent.insertAdjacentHTML('beforeend', modalContent);

  addFilmsToLibrary();
}

/*==============LocalStorage=============*/

function addFilmsToLibrary() {
  const watchedBtn = document.querySelector('.watched-btn');
  const queueBtn = document.querySelector('.queue-btn');

  watchedBtn.addEventListener('click', handleBtnWatched);
  queueBtn.addEventListener('click', handleBtnQueue);

  function handleBtnWatched() {
    watchedBtn.textContent = 'Delete from watched';

    addToWatched(id);
  }

  function handleBtnQueue() {
    queueBtn.textContent = 'Delete from Queue';

    addToQueue(id);
  }
}

/*функции проверяющие есть ли в массивах текущий фильм, если нет - добавляет его в локальное хранилище*/

let filmsWatched = [];

function addToWatched() {
  let localStorageData = localStorage.getItem('filmsWatched');
  console.log(localStorage.getItem('filmsWatched'));
  if (localStorageData) {
    filmsWatched = [...JSON.parse(localStorageData)];
    console.log(filmsWatched);
  }
  let currentIdFilm = id;

  let filmId = filmsWatched.find(el => el === currentIdFilm);
  if (filmId === currentIdFilm) {
    return;
  }
  filmsWatched.push(id);
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
}

let filmsQueue = [];

function addToQueue() {
  let localStorageData = localStorage.getItem('filmsQueue');
  console.log(localStorage.getItem('filmsQueue'));
  if (localStorageData) {
    filmsQueue = [...JSON.parse(localStorageData)];
  }
  let currentIdFilm = id;

  let filmId = filmsQueue.find(el => el === currentIdFilm);
  if (filmId === currentIdFilm) {
    return;
  }
  filmsQueue.push(id);
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
}
