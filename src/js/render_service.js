const moviesList = document.querySelector('[data-list]');
const moviesOnInputList = document.querySelector('#search-list');
const moviesSearch = document.querySelector('[data-container]');
const modal = document.querySelector('[data-modal]');
const modalVideo = document.querySelector('[data-modal-video]');

import { getGenres } from './genres_info';
import noPoster from '../images/movie-poster-coming-soon.jpg';

export default class RenderService {
	constructor() {}

	getClassByRate(vote) {
		if (vote >= 7) {
			return 'green';
		} else if (vote > 5) {
			return 'orange';
		} else {
			return 'red';
		}
	}

	renderMoviesOnInput(filmArray) {
		moviesOnInputList.innerHTML = '';

		const markup = filmArray
			.map(({ id, title, poster_path, release_date }) => {
				const imagePath =
					poster_path === null
						? `${noPoster}`
						: `https://image.tmdb.org/t/p/w500/${poster_path}`;
				const upperTitle = title.toUpperCase();

				return `
                    <li class="search-form-list__item" id=${id}/>
						<div class="search-form-list__thumbnail">
							<img src=${imagePath} alt="poster" id=${id} loading='lazy'/>
						</div>
						<div class="search-form-list__info">
							<h3 id=${id}>${upperTitle}</h3>
							<p id=${id}>${release_date}</p>
						</div>
					</li>				   	
                `;
			})
			.join('');

		moviesOnInputList.insertAdjacentHTML('afterbegin', markup);
	}

	renderSearchedFilms(filmArray) {
		moviesSearch.innerHTML = '';
		const markup = filmArray
			.map(
				({ id, title, poster_path, genre_ids, release_date, vote_average }) => {
					const imagePath =
						poster_path === null
							? `${noPoster}`
							: `https://image.tmdb.org/t/p/w500/${poster_path}`;
					const upperTitle = title.toUpperCase();
					const generesFilmArray = getGenres(genre_ids);
					const date = release_date.slice(0, 4);

					return `
                   <li class='movie_item' >
		              <img class='movie_image' src=${imagePath} alt='poster' loading='lazy' id=${id}/>
		              <h2 class='movie_title'>${upperTitle}</h2>
		              <p class='movie_text'>${generesFilmArray} | ${date}</p>
					  <div class='movie_rating movie_rating--${this.getClassByRate(
							vote_average,
						)}'>${vote_average}</div>
	               </li>
				   	
                `;
				},
			)
			.join('');

		moviesSearch.insertAdjacentHTML('afterbegin', markup);
	}

	renderPopularFilms(filmArray) {
		moviesList.innerHTML = '';
		const markup = filmArray
			.map(
				({ id, title, poster_path, genre_ids, release_date, vote_average }) => {
					const imagePath =
						poster_path === null
							? `${noPoster}`
							: `https://image.tmdb.org/t/p/w500/${poster_path}`;
					const upperTitle = title.toUpperCase();
					const generesFilmArray = getGenres(genre_ids);
					const date = release_date.slice(0, 4);

					return `
                    <li class='movie_item' >
		              <img class='movie_image' src=${imagePath} alt='poster' loading='lazy' id=${id}/>
		              <h2 class='movie_title'>${upperTitle}</h2>
		              <p class='movie_text'>${generesFilmArray} | ${date}</p>
					  <div class='movie_rating movie_rating--${this.getClassByRate(
							vote_average,
						)}' >${vote_average}</div>
	               </li>
				   
                `;
				},
			)
			.join('');

		moviesList.insertAdjacentHTML('afterbegin', markup);
	}

	renderFilmDetails(film) {
		modal.innerHTML = '';
		const {
			id,
			poster_path,
			title,
			popularity,
			genres,
			overview,
			vote_average,
			vote_count,
		} = film;
		const imagePath =
			poster_path === null
				? `${noPoster}`
				: `https://image.tmdb.org/t/p/w500/${poster_path}`;
		const upperTitle = title.toUpperCase();
		const genresFilm = genres.map(genre => genre.name).join(', ');

		const markup = `
            <div class='film__details modal id=${id}'>

		  <div class='img-thumb' >

			<img src=${imagePath} alt='poster' id=${id} loading='lazy'/>

			<div class='film__props'>
				<h1 class='film__title'>${upperTitle}</h1>
				<ul class='film__wrapper'>
					<li class='film__label'>
						<p class='film__text-left'>Vote / Votes</p>
						<p class='film__description-1'>
							<span class='accent'>${vote_average}</span><span class='accent-slash'>
								/</span> ${vote_count}</p>
					</li>
					<li class='film__label'>
						<p class='film__text-left'>Popularity</p>
						<p class='film__description-2'>${popularity}</p>
					</li>
					<li class='film__label'>
						<p class='film__text-left'>Original Title</p>
						<p class='film__description-3'>${upperTitle}</p>
					</li>
					<li class='film__label'>
						<p class='film__text-left'>Genres</p>
						<p class='film__description-4'>${genresFilm}</p>
					</li>
					
						<p class='film__about-text'>About</p>
						<p class='film__about'>${overview}</p>
					
				</ul>
				<div class='film__wrapper-trailer'>
				<div class='trailer'><img class='trailer__image' src='https://icons.iconarchive.com/icons/jamespeng/movie/256/trailer-icon.png' alt='poster' loading='lazy' id=${id}/></div>
				<div class='btn-block'>
					<button class='add-to-lib-btn' data-action='addToLib'>add to watched</button>
					<button class='add-to-que-btn' data-action='addToQue'>add to queue</button>
				</div>
				</div>
			</div>

		</div>
		<button class='close-btn' type="button" data-action='close'></button>
	</div>
        `;

		modal.insertAdjacentHTML('afterbegin', markup);
	}

	renderTrailer(filmArray) {
		modalVideo.innerHTML = '';
		const markup = filmArray
			.map(({ key }) => {
				return `
            <div class="video-trailer modal"
				><iframe
					src= 'https://www.youtube.com/embed/${key}'
					width="100%"
					height="500"
					frameborder="0"	
					allowfullscreen
					
				></iframe
			></div>
			<button class='close-btn-trailer' type="button" data-action='close'></button>   
                `;
			})
			.join('');

		modalVideo.insertAdjacentHTML('afterbegin', markup);
	}

	clearList() {
		modal.innerHTML = '';
	}

	clearGalleryList() {
		moviesList.innerHTML = '';
	}

	clearInputList() {
		moviesOnInputList.innerHTML = '';
	}
}
