export default class MovieApiService {
  constructor() {
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
        console.log(response);
        return response.json();
      })
      .then(({ results }) => {
        console.log({ results });
        this.changePage();
        return results;
      });
  }
  fethcMovieByQuery() {
    const url = `${this.baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
    return fetch(url)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(({ results }) => {
        console.log({ results });
        this.changePage();
        return results;
      });
  }
  changePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
