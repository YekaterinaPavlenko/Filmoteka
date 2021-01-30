import refs from './refs.js';
import galleryTpl from '../templates/cardMainPage.hbs';
export default function updateMarcup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(results));
}
