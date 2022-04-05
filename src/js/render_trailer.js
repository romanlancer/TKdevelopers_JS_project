import MoviesApiService from './fetch_api';
import RenderService from './render_service';
const modal = document.querySelector('[data-modal]');
const modalVideo = document.querySelector('[data-modal-video]');
const moviesApiService = new MoviesApiService();
const renderService = new RenderService();

modal.addEventListener('click', getVideo);

function closeModal() {
	modalVideo.classList.add('is-hidden');
	modalVideo.innerHTML = '';
}

function openModal(id) {
	modalVideo.classList.remove('is-hidden');
	moviesApiService.getFilmVideo(id).then(movie => {
		console.log(movie.data.results);
		renderService.renderTrailer(movie.data.results);
	});

	modalVideo.addEventListener('click', e => {
		if (e.target.dataset.action === 'close') {
			closeModal();
		}
	});
}

function getVideo(e) {
	if (
		e.target.nodeName === 'IMG' &&
		e.target.classList.contains('trailer__image')
	) {
		const id = parseInt(e.target.getAttribute('id'));
		console.log(id);
		openModal(id);
	}
}
