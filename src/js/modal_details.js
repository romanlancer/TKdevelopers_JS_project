import MoviesApiService from './fetch_api';

import movieDetails from '../templates/modal.hbs';
const modal = document.querySelector('[data-modal]');
const moviesListRef = document.querySelector('[data-list]');
const movieCollectionRef = document.querySelector('[data-container]');
const moviesApiService = new MoviesApiService();

function closeModal() {
	modal.classList.add('is-hidden');
	modal.innerHTML = '';
}

function openModal(id) {
	modal.classList.remove('is-hidden');
	moviesApiService.getFilmDetails(id).then(movie => {
		modal.insertAdjacentHTML('afterbegin', movieDetails(movie));
	});

	modal.addEventListener('click', e => {
		if (e.target.dataset.action === 'close') {
			closeModal();
		}
	});
}

function getDetails(e) {
	if (e.target.nodeName === 'IMG') {
		const { id } = e.target.parentNode;
		openModal(id);
	}
}

moviesListRef.addEventListener('click', getDetails);
movieCollectionRef.addEventListener('click', getDetails);
