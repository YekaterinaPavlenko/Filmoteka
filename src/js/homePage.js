import refs from './refs';
import notifications from './notifications.js';
import updateMarcup from './updateMarkupGallery.js';
import MovieApiService from './apiService.js';
// import pagination from './paging.js';

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
  // notifications.removeNotifications();
  movieApiService
    .createQueryMovieListWithGenres()
    .then(results => {
      notifications.removeNotifications();
      if (results.length === 0) {
        notifications.notFoundNotification();
      }

      clearGallery();
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

  // логика убирания кнопок галереи
  refs.searchForm.classList.remove('is-hidden');
  refs.watchedBtnRef.classList.add('is-hidden');
  refs.queueBtnRef.classList.add('is-hidden');
  refs.headerRef.classList.remove('bcg-libr');
  refs.libraryBtnRef.classList.remove('current');
  refs.homeBtn.classList.add('current');
  refs.gallery.classList.remove('gallery-bgr');
}
/////ф-ция подгрузки в зависимости от типа запроса
function uploadMovies() {
  // event.preventDefault();
  if (refs.inputForm.value != '') {
    movieApiService.query = refs.inputForm.value;

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentNumberOfPageBtn = 1;

/////ф-ция  подгрузки фильмов постранично
function updateMarkupByPages(event) {
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  event.preventDefault();
  currentNumberOfPageBtn = +event.target.textContent;
  movieApiService.page = +currentNumberOfPageBtn;
  // console.log(movieApiService.page);
  // console.log(typeof movieApiService.page);

  uploadMovies();
}

/////////// на одну страницу вперед от текущей
function forwardOnePage(event) {
  if (movieApiService.page === 1000) {
    return;
  }
  const toNumbPage = Number(movieApiService.page);
  movieApiService.page = toNumbPage + 1;
  console.log(movieApiService.page);
  // console.log(typeof movieApiService.page);
  uploadMovies();
}
/////////// на одну страницу назад от текущей
function backOnePage(event) {
  if (movieApiService.page === 1) {
    return;
  }
  const toNumbPage = Number(movieApiService.page);
  movieApiService.page = toNumbPage - 1;
  console.log(movieApiService.page);
  // console.log(typeof movieApiService.page);
  uploadMovies();
}

/////////////////////////////////////////
export {
  sendToHomePage,
  updateMarkupByPages,
  clearGallery,
  forwardOnePage,
  backOnePage,
  movieApiService,
};
// function renderPaging() {
//   movieApiService
//     .fetchPopularArticlesPages()
//     .then(results => {
//       console.log(results);
//       console.log(results.page, results.total_results, movieApiService.url);
//       // var paginator = pagination.create('search', {
//       //   prelink: movieApiService.url,
//       //   current: results.page,
//       //   rowsPerPage: 20,
//       //   totalResult: results.total_results,
//       // });
//       // pagination(results.total_pages, results.page, results.total_results);
//       // paginator.render();
//       // pagination(results.total_pages, results.total_results);
//     })
//     .catch(error => {
//       notifications.errorRequest();
//     });
// }
// renderPaging();
