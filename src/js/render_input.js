import MoviesApiService from './fetch_api';
import RenderService from './render_service';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const bodyEl = document.querySelector('body');
const modal = document.querySelector('[data-modal]');
const searchFormInputEl = document.querySelector('#searchQuery');
const inputContainer = document.querySelector('#search-list');
const moviesApiService = new MoviesApiService();
const renderService = new RenderService();
const DEBOUNCE_DELAY = 300;

Notiflix.Notify.init({
	position: 'center-top',
	width: '400px',
	fontSize: '18px',
});

searchFormInputEl.addEventListener(
	'input',
	debounce(onInputSearch, DEBOUNCE_DELAY),
);
inputContainer.addEventListener('click', getMovie);
bodyEl.addEventListener('click', inputClose);

function onInputSearch(e) {
	moviesApiService.query = e.target.value.trim();
	renderService.clearInputList();

	if (moviesApiService.query === '') {
		Notiflix.Notify.failure('Please type something');
		return;
	}
	moviesApiService
		.getFilmsByName()
		.then(({ data }) => {
			renderService.renderMoviesOnInput(data.results);

			if (data.total_results === 0 && moviesApiService.query !== 0) {
				Notiflix.Notify.failure('Sorry, film is not found');
			}
			if (data.results.length > 0) {
				renderService.renderMoviesOnInput(data.results);
			} else {
				renderService.clearInputList();
			}
		})
		.catch();
}

function inputClose(e) {
	if (e.target.className !== 'search-form_input') {
		renderService.clearInputList();
	}
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

function closeModal() {
	modal.classList.add('is-hidden');
	modal.innerHTML = '';
}

function getMovie(e) {
	searchFormInputEl.value = '';
	const id = parseInt(e.target.getAttribute('id'));
	openModal(id);
}
// function loadMovieDetails() {
// 	console.log(inputElItems);
// 	inputElItems.forEach(item => {
// 		item.addEventListener('click', () => {
// 			searchFormInputEl.value = '';
// 			renderService.clearInputList();
// 			const id = e.target.getAttribute(id);

// 			moviesApiService.getFilmDetails(id).then(movie => {
// 				renderService.renderSearchedFilms(movie.data);
// 			});
// 		});
// 	});
// }

// function onFetchError(error) {
// 	// if (moviesApiService.query === '') {
// 	// 		Notiflix.Notify.failure('Please type something');
// 	// 	}
// }
