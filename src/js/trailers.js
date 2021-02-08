import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
// import notifications from './notifications';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

let id;

function fetchTrailerFilm(id) {
  return fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(videos => {
      const trailerKey = videos.results[0].key;
      const trailer = basicLightbox.create(`
  <iframe width="450" height="320" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer_video"></iframe>
`);
      trailer.show();
    })
    .catch(error => {
      console.log('no trailer');
    });
}

refs.gallery.addEventListener('click', hadleClickTrailer);

function hadleClickTrailer(e) {
  id = event.target.dataset.id;

  const targetClass = e.target.className;
  if (targetClass === 'trailer-div' || targetClass === 'trailer-space') {
    fetchTrailerFilm(id);
  }
  return;
}
