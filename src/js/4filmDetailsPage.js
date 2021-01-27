import modalTpl from '../templates/detailsPage.hbs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';


(() => {
	const refs = {
		openModalBtn: document.querySelector("[data-modal-open]"),
		closeModal: document.querySelector("[data-modal-close]"),
		modal: document.querySelector("[data-modal]"),
	}

	refs.openModalBtn.addEventListener("click", toggleModal)
	refs.openModalBtn.addEventListener("keydown", toggleModal)
   

	function toggleModal() {
        refs.modal.classList.toggle("is-hidden")
    }

    document.removeEventListener("click", toggleModal)
    document.removeEventListener("keydown", onEscape)
    

    function onEscape(event){
        if(event.key === "Escape") {
            console.log("Click Escape")
            
        }
        refs.modalContent.innerHTML = '';
        window.removeEventListener('keydown', onEscape);
    }
})()


