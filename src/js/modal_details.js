import MoviesApiService from './fetch_api';
import RenderService from './render_service';
const modal = document.querySelector('[data-modal]');
const moviesListRef = document.querySelector('[data-list]');
const movieCollectionRef = document.querySelector('[data-container]');
const moviesApiService = new MoviesApiService();
const renderService = new RenderService();

function closeModal() {
	modal.classList.add('is-hidden');
	modal.innerHTML = '';
}

function openModal(id) {
	modal.classList.remove('is-hidden');
	moviesApiService.getFilmDetails(id).then(movie => {
		renderService.renderFilmDetails(movie.data);
	});

	modal.addEventListener('click', e => {
		if (e.target.dataset.action === 'close') {
			closeModal();
		}
	});
}

function getDetails(e) {
	if (e.target.nodeName === 'IMG') {
		const id = parseInt(e.target.getAttribute('id'));
		console.log(id);
		openModal(id);
	}
}

moviesListRef.addEventListener('click', getDetails);
movieCollectionRef.addEventListener('click', getDetails);
