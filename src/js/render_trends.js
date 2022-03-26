import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { generateImgPath } from './generate_img_path';
import moviesCardTemplate from '../templates/movie_cards.hbs';

const moviesListRef = document.querySelector('[data-list]');
const nextPageRef = document.querySelector('.next-page');
const prevPageRef = document.querySelector('.prev-page');
const currentPageRef = document.querySelector('.current-page');
const modal = document.querySelector('[data-modal]');
const library = document.querySelector('[data-library]');

const moviesApiService = new MoviesApiService();

const moviePagination = new Pagination({
	total: 100,
	onChange(value) {
		handlePageChange(value);
		currentPageRef.textContent = value;
	},
});

const renderMovieList = movies => {
	const moviesList = movies.map(movie => {
		const { original_title, poster_path } = movie;

		return {
			original_title,
			poster: generateImgPath(poster_path),
		};
	});

	moviesListRef.insertAdjacentHTML('beforeend', moviesCardTemplate(moviesList));
};

const handlePageChange = currentPage => {
	moviesApiService.getPopularFilms(currentPage).then(({ data }) => {
		renderMovieList(data.results);
	});
};

nextPageRef.addEventListener('click', () => {
	moviePagination.nextPage();
});

prevPageRef.addEventListener('click', () => {
	moviePagination.prevPage();
});

moviesApiService.getPopularFilms().then(({ data }) => {
	const { results: movies } = data;

	renderMovieList(movies);
});
