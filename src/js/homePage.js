import refs from './refs';
import notifications from './notifications.js';
import addPaginationMarkup from './pagenationMarkup.js';
import updateMarcup from './updateMarkupGallery.js';
import LoadMoreBtn from './loadMoreBtn.js';
import MovieApiService from './apiService.js';

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.js-load_more', // Создаю экземпляр кнопки загрузить еще
//   hidden: true,
// });

const movieApiService = new MovieApiService(); //Создаю экземпляр класса поиска фильмов
refs.submitBtn.addEventListener('submit', fetchMoviesByQuery);
refs.homeBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке НОМЕ- отправляет на основную(первую) стр.
refs.logoBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке Filmoteka ^ делает то же самое
// loadMoreBtn.refs.button.addEventListener('click', uploadMovies);

fetchPopMovies(); //Запрос и отрисовка главной страницы при  первой загрузке
// addPaginationMarkup(); //Запрос и отрисовка главной страницы при  первой загрузке
// loadMoreBtn.show(); // показывает кнопку "загрузить еще"

// ф-ция запроса популярных фильмов и отрисовки результата запроса

function fetchPopMovies(event) {
  // event.preventDefault();
  // loadMoreBtn.enable();
  movieApiService
    .createPopMovieListWithGenres()
    .then(results => {
      console.log(results);
      notifications.removeNotifications();
      updateMarcup(results);
    })
    .catch(error => {
      notifications.errorRequest();
      // loadMoreBtn.hide();
    });
}
///////////// ф-ция запроса  по ключевому слову и отрисовки результата запроса
function fetchMoviesByQuery(event) {
  event.preventDefault();
  movieApiService.query = event.target.elements.search.value;

  clearGallery();
  // loadMoreBtn.enable();
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
      // loadMoreBtn.hide();
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

////Попытка привязать подгрузку разных страниц под одну кнопку удалась!

function uploadMovies(event) {
  if (refs.inputForm.value != '') {
    movieApiService.query = refs.inputForm.value;
    // loadMoreBtn.enable();
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
    fetchPopMovies();
  }
}
