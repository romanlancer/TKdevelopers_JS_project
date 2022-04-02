import MoviesApiService from './fetch_api';
import Notiflix from 'notiflix';
import Pagination from './pagination';
import { generateImgPath } from './generate_img_path';
import moviesCardTemplate from '../templates/movie_cards.hbs';

const moviesListRef = document.querySelector('[data-list]');
const paginationListRef = document.querySelector(
	'.pagination .pagination-list',
);
const nextPageRef = document.querySelector('.next-page');
const prevPageRef = document.querySelector('.prev-page');
const searchFormRef = document.querySelector('#search-form');

const moviesApiService = new MoviesApiService();

const moviePagination = new Pagination({
	total: 1,
	onChange(value) {
		handlePageChange(value);
	},
});

Notiflix.Notify.init({
	position: 'top-right',
	width: '400px',
	fontSize: '18px',
});

searchFormRef.addEventListener('submit', onSearch);

nextPageRef.addEventListener('click', () => {
	moviePagination.nextPage();
});

prevPageRef.addEventListener('click', () => {
	moviePagination.prevPage();
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

function onSearch(e) {
	e.preventDefault();
	moviesApiService.query = e.currentTarget.elements.searchQuery.value;

	if (moviesApiService.query === '') {
		return Notiflix.Notify.failure('Wrong attempt bro, please enter something');
	}
	clearMoviesContainer();
	moviePagination.currentPage = 1;
}

function clearMoviesContainer() {
	moviesListRef.innerHTML = '';
}

function renderMovieList(movies) {
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
			id,
			original_title,
			poster_path,
			genre_ids,
			release_date,
			vote_average,
			id,
			original_title,
			poster: generateImgPath(poster_path),
		};
	});

	moviesListRef.insertAdjacentHTML('beforeend', moviesCardTemplate(moviesList));
}

function handlePageChange(currentPage) {
	moviesApiService.page = currentPage;
	moviesApiService.getFilmsByName().then(({ data }) => {
		clearMoviesContainer();
		renderMovieList(data.results);
		moviePagination.total = data.total_pages;

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
}
