import MoviesApiService from './fetch_api';
import RenderService from './render_service';
import { save, load, remove } from './storage';
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

		const addToLibBtn = document.querySelector('.add-to-lib-btn');
		const detailsId = document.querySelector('.film__details').id;
		console.log(detailsId);
		addToLibBtn.addEventListener('click', e => {
			const movieForLib = {
				id: parseInt(document.querySelector('.movie_image').id),
				img: document.querySelector('.movie_image').src,
				title: document.querySelector('.movie_title').textContent,
				genreAndDate: document.querySelector('.movie_rating').textContent,
			};

			save('card', movieForLib);
		});
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
