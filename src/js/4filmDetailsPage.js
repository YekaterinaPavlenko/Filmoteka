import refs from './refs';
import modalTpl from '../templates/detailsPage.hbs';
import MovieApiService from './apiService.js';

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

let id = 550;
const movieApiService = new MovieApiService();
console.log(movie);

console.log(refs.openModal);
console.log(refs.modal);

refs.openModal.addEventListener('click', openModal);

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalBox.classList.remove('is-hidden');
  fetchFilm();
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
    console.log('close modal window');
  }
}

function fetchFilm(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/550?api_key=c2406e33bae3c04a8fdebb618c81ede7`,
    // `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
  )
    .then(response => response.json())

    .then(movie => appendMarkup(movie));
}

function appendMarkup(movie) {
  const modalContent = modalTpl(movie);
  refs.modalContent.insertAdjacentHTML('beforeend', modalContent);
}
