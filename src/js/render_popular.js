import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { generateImgPath } from './generate_img_path';
import moviesCardTemplate from '../templates/movie_cards.hbs';

const moviesListRef = document.querySelector('[data-container]');
const paginationListRef = document.querySelector(
	'.pagination .pagination-list',
);
const nextPageRef = document.querySelector('.next-page');
const prevPageRef = document.querySelector('.prev-page');

const moviesApiService = new MoviesApiService();

const moviePagination = new Pagination({
	total: 1,
	onChange(value) {
		handlePageChangeMain(value);
	},
});

const renderMovieList = movies => {
	const moviesList = movies.map(movie => {
		const {
			id,
			original_title,
			poster_path,
			genre_ids,
			release_date,
			vote_average,
		} = movie;

		return {
			genre_ids,
			release_date,
			vote_average,
			id,
			original_title,
			poster: generateImgPath(poster_path),
		};
	});

	moviesListRef.insertAdjacentHTML('beforeend', moviesCardTemplate(moviesList));
};

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
	clearMoviesContainer();
	moviesApiService.getPopularFilms().then(({ data }) => {
		renderMovieList(data.results);

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
	renderMovieList(data.results);
	console.log(data);

	moviePagination.total = 500;
	moviePagination.currentPage = 1;
});

function clearMoviesContainer() {
	moviesListRef.innerHTML = '';
}
