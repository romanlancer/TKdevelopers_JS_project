import MoviesApiService from './fetch_api';
import RenderService from './render_service';
import Pagination from './pagination';
import { save, load, remove } from './storage';
const moviesList = document.querySelector('[data-list]');
const paginationListRef = document.querySelector(
	'.pagination .pagination-list',
);
const nextPageRef = document.querySelector('.next-page');
const prevPageRef = document.querySelector('.prev-page');

const moviesApiService = new MoviesApiService();
const renderService = new RenderService();
const moviePagination = new Pagination({
	total: 1,
	onChange(value) {
		handlePageChangeMain(value);
	},
});

paginationListRef.addEventListener('click', event => {
	if (
		event.target.parentNode.classList.contains('pagination-number') &&
		!event.target.parentNode.classList.contains('active')
	) {
		const clickPage = parseInt(event.target.textContent);
		moviePagination.currentPage = clickPage;
	}
});

const handlePageChangeMain = currentPage => {
	moviesApiService.page = currentPage;

	moviesApiService.getPopularFilms().then(({ data }) => {
		renderService.renderPopularFilms(data.results);
		const renderedMovies = document.querySelectorAll('.movie_item');
		const arrOfMovies = Array.from(renderedMovies);

		console.log(arrOfMovies);

		moviePagination.total = 0;
		moviePagination.total = 500;

		if (currentPage === 1) {
			prevPageRef.setAttribute('disabled', true);
			prevPageRef.classList.add('disabled');
		} else {
			prevPageRef.removeAttribute('disabled');
			prevPageRef.classList.remove('disabled');
		}
		if (currentPage === moviePagination.total) {
			nextPageRef.setAttribute('disabled', true);
			nextPageRef.classList.add('disabled');
		} else {
			nextPageRef.removeAttribute('disabled');
			nextPageRef.classList.remove('disabled');
		}

		const paginationElem = moviePagination.createPaginationList();
		paginationListRef.innerHTML = '';
		paginationListRef.append(...paginationElem);
	});
};

nextPageRef.addEventListener('click', () => {
	moviePagination.nextPage();
});

prevPageRef.addEventListener('click', () => {
	moviePagination.prevPage();
});

moviesApiService.getPopularFilms().then(({ data }) => {
	renderService.renderPopularFilms(data.results);

	moviePagination.currentPage = 1;
});

function clearMoviesContainer() {
	moviesList.innerHTML = '';
}

function saveDataToStorage(movieCards) {
	const results = [];

	for (i = 0; i < movieCards.length; i++) {
		const data = {};
	}
}
