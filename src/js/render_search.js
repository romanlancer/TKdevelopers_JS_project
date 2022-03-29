import MoviesApiService from './fetch_api';
import Notiflix from 'notiflix';
import Pagination from './pagination';
import { generateImgPath } from './generate_img_path';
import moviesCardTemplate from '../templates/movie_cards.hbs';

const moviesListRef = document.querySelector('[data-list]');
const nextPageRef = document.querySelector('.next-page');
const prevPageRef = document.querySelector('.prev-page');
const currentPageRef = document.querySelector('.current-page');
const searchFormRef = document.querySelector('#search-form');

const moviesApiService = new MoviesApiService();

Notiflix.Notify.init({
	position: 'top-right',
	width: '400px',
	fontSize: '18px',
});

searchFormRef.addEventListener('submit', onSearch);

function onSearch(e) {
	e.preventDefault();
	moviesApiService.query = e.currentTarget.elements.searchQuery.value;

	if (moviesApiService.query === '') {
		return Notiflix.Notify.failure('Wrong attempt bro, please enter something');
	}
	moviesApiService.resetPage();
	clearMoviesContainer();
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

		moviesListRef.insertAdjacentHTML(
			'beforeend',
			moviesCardTemplate(moviesList),
		);
	};
	moviesApiService.getFilmsByName().then(({ data }) => {
		const { results: movies } = data;

		renderMovieList(movies.slice(0, 9));
		console.log(data);
	});

	const handlePageChange = currentPage => {
		moviesApiService.getFilmsByName(currentPage).then(({ data }) => {
			clearMoviesContainer();

			renderMovieList(data.results.slice(0, 9));
			console.log(data);
		});
	};

	nextPageRef.addEventListener('click', () => {
		moviePagination.nextPage();
		moviesApiService.incrementPage();
	});

	prevPageRef.addEventListener('click', () => {
		moviePagination.prevPage();
		moviesApiService.decrementPage();
	});
}

function clearMoviesContainer() {
	moviesListRef.innerHTML = '';
}
