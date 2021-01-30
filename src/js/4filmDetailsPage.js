'use strict';
import modalTpl from '../templates/detailsPage.hbs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

let oflineResult = {
  adult: false,
  backdrop_path: '/52AfXWuXCHn3UjD17rBruA9f5qb.jpg',
  belongs_to_collection: null,
  budget: 63000000,
  genres: [{ id: 18, name: 'Drama' }],
  homepage: 'http://www.foxmovies.com/movies/fight-club',
  id: 550,
  imdb_id: 'tt0137523',
  original_language: 'en',
  original_title: 'Fight Club',
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 35.315,
  poster_path: '/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg',
  production_companies: [
    {
      id: 508,
      logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
      name: 'Regency Enterprises',
      origin_country: 'US',
    },
    {
      id: 711,
      logo_path: '/tEiIH5QesdheJmDAqQwvtN60727.png',
      name: 'Fox 2000 Pictures',
      origin_country: 'US',
    },
    {
      id: 20555,
      logo_path: '/hD8yEGUBlHOcfHYbujp71vD8gZp.png',
      name: 'Taurus Film',
      origin_country: 'DE',
    },
    {
      id: 54051,
      logo_path: null,
      name: 'Atman Entertainment',
      origin_country: '',
    },
    {
      id: 54052,
      logo_path: null,
      name: 'Knickerbocker Films',
      origin_country: 'US',
    },
    {
      id: 25,
      logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
      name: '20th Century Fox',
      origin_country: 'US',
    },
    {
      id: 4700,
      logo_path: '/A32wmjrs9Psf4zw0uaixF0GXfxq.png',
      name: 'The Linson Company',
      origin_country: '',
    },
  ],
  production_countries: [
    { iso_3166_1: 'DE', name: 'Germany' },
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  release_date: '1999-10-15',
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
  ],
  status: 'Released',
  tagline: 'Mischief. Mayhem. Soap.',
  title: 'Fight Club',
  video: false,
  vote_average: 8.4,
  vote_count: 20971,
};

// let movie = oflineResult;
let movie = {};
let id = 550;

console.log(movie);
const refs = {
  backdrop: document.querySelector('.js-backdrop'),
  modalContent: document.querySelector('.backdrop-content'),
  modal: document.querySelector('.modal'),
};

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  window.addEventListener('keydown', onEscape);
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.openModalBtn.addEventListener('keydown', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  document.removeEventListener('click', toggleModal);
  document.removeEventListener('keydown', onEscape);

  //   function onEscape(event) {
  //     if (event.key === 'Escape') {
  //       console.log('Click Escape');
  //     }
  //     refs.modalContent.innerHTML = '';
  //     window.removeEventListener('keydown', onEscape);
  //   }
})();

function onEscape(e) {
  if (e.code !== 'Escape') {
    return;
  }
  console.log('eskape button');
  closeModal();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('js-backdrop')) {
    return;
  } else if (e.target.classList.contains('js-btn')) {
    return;
  }
  console.log('click in backdrop');
  closeModal();
}

function closeModal() {
  refs.backdrop.classList.remove('opened');

  refs.modalContent.innerHTML = '';

  window.removeEventListener('keydown', onEscape);
  console.log('close modal window');
}

const genreIdsArr = [];
fetchFilm();

function fetchFilm(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/550?api_key=c2406e33bae3c04a8fdebb618c81ede7`,
    // `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
  )
    .then(response => response.json())

    .then(movie => appendMarkup(movie), console.log('recive result', movie));
}

function appendMarkup(movie) {
  const modalContent = modalTpl(movie);
  refs.modalContent.insertAdjacentHTML('beforeend', modalContent);
}
