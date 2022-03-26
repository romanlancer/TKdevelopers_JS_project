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
	console.log(moviesApiService.query);
	if (moviesApiService.query === '') {
		return Notiflix.Notify.failure('Wrong attempt bro, please enter something');
	}
	moviesApiService.resetPage();
	clearMoviesContainer();
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
	const moviePagination = new Pagination({
		total: 100,
		onChange(value) {
			handlePageChange(value);
			currentPageRef.textContent = value;
		},
	});

	const handlePageChange = currentPage => {
		moviesApiService.getFilmsByName(currentPage).then(({ data }) => {
			renderMovieList(data.results);
		});
	};

	moviesApiService.getFilmsByName().then(({ data }) => {
		const { results: movies } = data;
		moviesApiService.incrementPage();
		renderMovieList(movies);
	});

	nextPageRef.addEventListener('click', () => {
		moviePagination.nextPage();
	});

	prevPageRef.addEventListener('click', () => {
		moviePagination.prevPage();
	});
}

function clearMoviesContainer() {
	moviesListRef.innerHTML = '';
}
