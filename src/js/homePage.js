import refs from './refs';
// import notifications from './js/notifications.js'; //Подключить файл с нотификашкой
import updateMarcup from './updateMarkupGallery.js';
import LoadMoreBtn from './loadMoreBtn.js';
import MovieApiService from './apiService.js';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.js-load_more', // Создаю экземпляр кнопки загрузить еще
  hidden: true,
});

// console.log(loadMoreBtn);
const movieApiService = new MovieApiService(); //Создаю экземпляр класса поиска фильмов
refs.submitBtn.addEventListener('submit', fetchMoviesByQuery);
refs.homeBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке НОМЕ- отправляет на основную(первую) стр.
refs.logoBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке Filmoteka ^ делает то же самое
loadMoreBtn.refs.button.addEventListener('click', fetchPopMovies);

fetchPopMovies(); //Запрос и отрисовка главной страницы при  первой загрузке
loadMoreBtn.show(); // показывает кнопку "загрузить еще"

function fetchPopMovies() {
  // event.preventDefault();
  loadMoreBtn.enable(); // сама ф-ция  запроса и отрисовки результата запроса
  movieApiService
    .createPopMovieListWithGenres()
    .then(results => {
      console.log(results);
      // if (results.length === 0) {
      //   // notifications.notFound(); //Вместо нотификашки подключить отбражение нотификации под формой 'это все фильмы, которые мы нашли'
      // }
      loadMoreBtn.show();
      loadMoreBtn.disable();
      updateMarcup(results);
      loadMoreBtn.enable();

      // refs.gallery.addEventListener('click', createModalImg); // Любомир вместо createModalImg должен поставить свою ф-цию открытия модалки.
    })
    .catch(error => {
      // notifications.errorRequest;
      loadMoreBtn.hide();
    });
}
///////////// сама ф-ция  запроса и отрисовки результата запроса
function fetchMoviesByQuery(event) {
  event.preventDefault();
  // console.log(event.target);
  movieApiService.query = event.target.elements.search.value;

  clearGallery();
  loadMoreBtn.enable(); // сама ф-ция  запроса и отрисовки результата запроса
  movieApiService
    .createQueryMovieListWithGenres()
    .then(results => {
      // console.log(results);
      // if (results.length === 0) {
      //   // notifications.notFound(); //Вместо нотификашки подключить отбражение нотификации под формой 'это все фильмы, которые мы нашли'
      // }
      loadMoreBtn.show();
      loadMoreBtn.disable();
      updateMarcup(results);
      loadMoreBtn.enable();

      // refs.gallery.addEventListener('click', createModalImg); // Любомир вместо createModalImg должен поставить свою ф-цию открытия модалки.
    })
    .catch(error => {
      // notifications.errorRequest;
      loadMoreBtn.hide();
    });
}
/// Очистка галлереи
function clearGallery() {
  refs.gallery.innerHTML = '';
}

////Отправка на домашнюю страницу
function sendToHomePage(event) {
  event.preventDefault();
  clearGallery();
  movieApiService.resetPage();
  fetchPopMovies();
}

////Попытка привязать подгрузку разных страниц под одну кнопку

// console.dir(refs.inputForm);
// function uploadMovies(event) {
//   console.log(refs.inputForm);
//   if ((movieApiService.searchQuery = refs.inputForm)) {
//     fetchMoviesByQuery();
//   } else if ((movieApiService.searchQuery = refs.inputForm)) {
//     fetchPopMovies();
//   }
// }
