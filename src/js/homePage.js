import refs from './refs';
import genres from './genresList.js';
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
movieApiService.fetchGenresList().then(genres => console.log(genres));
// refs.homeBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке НОМЕ- отправляет на основную(первую) стр.
// refs.logoBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке Filmoteka ^ делает то же самое
loadMoreBtn.refs.button.addEventListener('click', fetchPopMovies);

fetchPopMovies(); //Запрос и отрисовка главной страницы при  первой загрузке
loadMoreBtn.show(); // показывает кнопку "загрузить еще"

function fetchPopMovies() {
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

// function sendToHomePage() {
//   event.preventDefault();
//   movieApiService.resetPage();
//   fetchPopMovies();
// }

function getIdName() {
  movieApiService.fetchPopularMovies().then();
  console.log(popMoviesList);
  const genresList = fetchGenresList();
  console.log(genresList);
}
