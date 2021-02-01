export default class MovieApiService {
  constructor() {
    this.inputValue = '';
    this.searchQuery = '';
    this.page = 1;
    this.apiKey = '90996ae54f24edbe7886996fac12fc31';
    this.baseUrl = `https://api.themoviedb.org/3`;
  }
  //Поиск по запросу популярных фильмов.Вынесла в отдельную ф-цию, чтоб не запутаться в зенах.
  fetchPopularMovies() {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`;

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.changePage();
        return results;
      });
  }

  //Поиск по запросу фильмов по слову.Вынесла в отдельную ф-цию, чтоб не запутаться в зенах.

  fethcMovieByQuery() {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${this.query}&page=${this.page}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.changePage();
        return results;
      });
  }

  //поиск списка жанров

  fetchGenresList() {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        return genres;
      });
  }
  changePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  undoPage() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  //поиск поп-фильмов, добавление в объект массива фильмов названий жанров и обрезанной даты
  createPopMovieListWithGenres() {
    return this.fetchPopularMovies().then(data => {
      return this.fetchGenresList().then(genresList => {
        return data.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'n/a',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2)
                .flat()
            : 'watch the movie and decide',
        }));
      });
    });
  }
  //поиск фильмов по слову, добавление в объект массива фильмов названий жанров и обрезанной даты
  createQueryMovieListWithGenres() {
    return this.fethcMovieByQuery().then(data => {
      return this.fetchGenresList().then(genresList => {
        return data.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.slice(0, 4) : '',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2)
                .flat()
            : 'watch the movie and decide',
        }));
      });
    });
  }
}
