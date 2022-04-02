const moviesList = document.querySelector('[data-list]');
const moviesSearch = document.querySelector('[data-container]');
const modal = document.querySelector('[data-modal]');

import { getGenres } from './genres_info';
import noPoster from '../images/movie-poster-coming-soon.jpg';

export default class RenderService {
	constructor() {}

	renderSearchedFilms(filmArray) {
		moviesSearch.innerHTML = '';
		const markup = filmArray
			.map(({ id, title, poster_path, genre_ids, release_date }) => {
				const imagePath =
					poster_path === null
						? `${noPoster}`
						: `https://image.tmdb.org/t/p/w500/${poster_path}`;
				const upperTitle = title.toUpperCase();
				const generesFilmArray = getGenres(genre_ids);
				const date = release_date.slice(0, 4);

				return `
                   <li class='movie' id=${id}>
		              <img class='movie_image' src=${imagePath} alt='poster' loading='lazy'/>
		              <h2 class='movie_title'>${upperTitle}</h2>
		              <p class='movie_text'>${generesFilmArray} | ${date}</p>
	               </li>
                `;
			})
			.join('');

		moviesSearch.insertAdjacentHTML('afterbegin', markup);
	}

	renderPopularFilms(filmArray) {
		moviesList.innerHTML = '';
		const markup = filmArray
			.map(({ id, title, poster_path, genre_ids, release_date }) => {
				const imagePath =
					poster_path === null
						? `${noPoster}`
						: `https://image.tmdb.org/t/p/w500/${poster_path}`;
				const upperTitle = title.toUpperCase();
				const generesFilmArray = getGenres(genre_ids);
				const date = release_date.slice(0, 4);

				return `
                    <li class='movie' id=${id}>
		              <img class='movie_image' src=${imagePath} alt='poster' loading='lazy'/>
		              <h2 class='movie_title'>${upperTitle}</h2>
		              <p class='movie_text'>${generesFilmArray} | ${date}</p>
	               </li>
                `;
			})
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
            <div class='film__details modal'>

		  <div class='img-thumb' id=${id}>

			<img src=${imagePath} alt='poster' />

			<div class='film__props'>
				<h1 class='film__title'>${upperTitle}</h1>
				<ul class='film__wrapper'>
					<li class='film__label'>
						<p>Vote / Votes</p>
						<p class='film__description-1'>
							<span class='accent'>${vote_average}</span><span></span>
								/</span> ${vote_count}</p>
					</li>
					<li class='film__label'>
						<p>Popularity</p>
						<p class='film__description-2'>${popularity}</p>
					</li>
					<li class='film__label'>
						<p>Original Title</p>
						<p class='film__description-3'>${title}</p>
					</li>
					<li class='film__label'>
						<p>Genres</p>
						<p class='film__description-4'>${genresFilm}</p>
					</li>
					<li class='film__label-about'>
						<p>About</p>
						<p class='film__about'>${overview}</p>
					</li>
				</ul>
				
				<div class='btn-block'>
					<button class='add-to-lib-btn' data-action='addToLib'>add to watched</button>
					<button class='add-to-que-btn' data-action='addToQue'>add to queue</button>
				</div>
			</div>

		</div>
		<button class='close-btn' type="button" data-action='close'>
			<svg  data-action='close' width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"/>
             </svg>
		</button>
	</div>
        `;

		modal.insertAdjacentHTML('afterbegin', markup);
	}

	clearList() {
		modal.innerHTML = '';
	}

	clearGalleryList() {
		moviesList.innerHTML = '';
	}
}
