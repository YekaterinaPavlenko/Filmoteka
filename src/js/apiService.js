export default class MovieApiService {
  constructor() {
    this.inputValue = '';
    this.searchQuery = '';
    this.page = 1;
    this.apiKey = '90996ae54f24edbe7886996fac12fc31';
    this.baseUrl = `https://api.themoviedb.org/3`;
  }

  fetchPopularMovies() {
    // this.requestType = /search/movie; //для поиска по запросу
    // this.requestType = /genre/movie/list; //для поиска списка жанров

    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`;
    // /search/movie?api_key=${apiKey}&query=${query}&${page}`
    return fetch(url)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(({ results }) => {
        // console.log({ results });
        this.changePage();
        return results;
      });
  }
  fethcMovieByQuery() {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${this.query}&page=${this.page}`;
    return fetch(url)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(({ results }) => {
        // console.log({ results });
        this.changePage();
        return results;
      });
  }
  fetchGenresList() {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(({ genres }) => {
        // console.log({ genres });
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
  createPopMovieListWithGenres() {
    return this.fetchPopularMovies().then(data => {
      return this.fetchGenresList().then(genresList => {
        // let release_date;
        return data.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'n/a',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .flat()
            : 'watch the movie and decide',
        }));
      });
    });
  }
  createQueryMovieListWithGenres() {
    return this.fethcMovieByQuery().then(data => {
      return this.fetchGenresList().then(genresList => {
        let release_date;
        return data.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'n/a',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .flat()
            : 'n/a',
        }));
      });
    });
  }
}
