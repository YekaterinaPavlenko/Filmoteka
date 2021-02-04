import refs from './refs';
//window.onload = function () {
//spinnerRef = document.getElementById('load').classList('is-hidden');
//};

const spinner = {
  show() {
    refs.spinnerRef.classList.remove('is-hidden');
  },
  hide() {
    refs.spinnerRef.classList.add('is-hidden');
  },
};
spinner.hide();
//spinner.show();
