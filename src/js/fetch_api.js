import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = 'e236468c654efffdf9704cd975a74a96';

export default class MoviesApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
	}

	set query(newQuery) {
		this.query = newQuery;
	}

	get query() {
		return this.searchQuery;
	}

	async getPopularFilms() {
		try {
			const url = `${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}`;
			const response = await axios.get(url);
			return response;
		} catch (error) {
			return error;
		}
	}

	async getFilmsByName() {
		try {
			const url = `${BASE_URL}/3/search/movie?query=${this.searchQuery}&api_key=${API_KEY}`;
			const response = await axios.get(url);
			return response;
		} catch (error) {
			return error;
		}
	}

	async getFilmDetails(id) {
		try {
			const url = `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`;
			const response = await axios.get(url);
			return response;
		} catch (error) {
			return error;
		}
	}
}
