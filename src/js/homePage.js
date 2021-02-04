import refs from './refs';
import notifications from './notifications.js';
import updateMarcup from './updateMarkupGallery.js';
import MovieApiService from './apiService.js';

const movieApiService = new MovieApiService(); //Создаю экземпляр класса поиска фильмов
refs.submitBtn.addEventListener('submit', fetchMoviesByQuery);
refs.homeBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке НОМЕ- отправляет на основную(первую) стр.
refs.logoBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке Filmoteka ^ делает то же самое
refs.pagingList.addEventListener('click', updateMarkupByPages);

fetchPopMovies(); //Запрос и отрисовка главной страницы при  первой загрузке

// ф-ция запроса популярных фильмов и отрисовки результата запроса

function fetchPopMovies() {
  // event.preventDefault();

  movieApiService
    .createPopMovieListWithGenres()
    .then(results => {
      notifications.removeNotifications();
      updateMarcup(results);
    })
    .catch(error => {
      notifications.errorRequest();
    });
}
///////////// ф-ция запроса  по ключевому слову и отрисовки результата запроса
function fetchMoviesByQuery(event) {
  event.preventDefault();
  movieApiService.query = event.target.elements.search.value;
  clearGallery();

  movieApiService
    .createQueryMovieListWithGenres()
    .then(results => {
      notifications.removeNotifications();
      if (results.length === 0) {
        notifications.notFoundNotification();
      }
      updateMarcup(results);
    })
    .catch(error => {
      notifications.errorRequest();
    });
}

/// Очистка галлереи
function clearGallery() {
  refs.gallery.innerHTML = '';
}

////Отправка на домашнюю страницу
function sendToHomePage(event) {
  event.preventDefault();
  refs.inputForm.value = '';
  movieApiService.query = '';
  clearGallery();
  movieApiService.resetPage();
  notifications.removeNotifications();
  fetchPopMovies();
}

////Попытка привязать подгрузку разных страниц под номера страниц удалась!
export default function updateMarkupByPages(event) {
  event.preventDefault();
  let currentNumberOfPageBtn = 1;
  currentNumberOfPageBtn = event.target.textContent;
  movieApiService.page = currentNumberOfPageBtn;
  console.log(movieApiService.page);
  uploadMovies();
}

function uploadMovies() {
  // event.preventDefault();
  if (refs.inputForm.value != '') {
    movieApiService.query = refs.inputForm.value;
    // loadMoreBtn.enable();
    clearGallery();
    movieApiService
      .createQueryMovieListWithGenres()
      .then(results => {
        if (results.length === 0) {
          notifications.allFoundFilmsNotification();
        }
        updateMarcup(results);
      })
      .catch(error => {
        notifications.errorRequest;
        // loadMoreBtn.hide();
      });
  } else if (!refs.inputForm.value) {
    clearGallery();
    fetchPopMovies();
  }
}
