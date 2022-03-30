import { createElement } from './createElement';

export default class Pagination {
	#currentPage = 1;

	constructor({ initialPage = 1, total = 1, onChange }) {
		this.#currentPage = initialPage;
		this.total = total;
		this.onChange = onChange;
		this.paginationList = [];
	}

	get currentPage() {
		return this.#currentPage;
	}

	set currentPage(value) {
		this.#currentPage = value;

		if (this.onChange) {
			this.onChange(value);
		}

		// опциональный вызов функции
		// onChange?.(value)
	}

	nextPage() {
		if (this.currentPage === this.total) {
			return;
		}

		this.currentPage += 1;
	}

	prevPage() {
		if (this.currentPage === 1) {
			return;
		}

		this.currentPage -= 1;
	}

	createPaginationList() {
		let beforePage = this.currentPage - 2;
		let afterPage = this.currentPage + 2;

		this.paginationList = [];

		if (this.currentPage === 1) {
			const firstElem = createElement(
				'li',
				{ class: 'first-num pagination-item pagination-number active' },
				createElement('span', {}, '1'),
			);
			this.paginationList.push(firstElem);
		} else {
			const firstElem = createElement(
				'li',
				{ class: 'first-num pagination-item pagination-number' },
				createElement('span', {}, '1'),
			);
			this.paginationList.push(firstElem);
		}

		if (this.currentPage > 4) {
			const startDots = createElement(
				'li',
				{ class: 'pagination-item pagination-dots' },
				createElement('span', {}, '...'),
			);
			this.paginationList.push(startDots);
		}
		if (this.currentPage === 1) {
			afterPage = this.currentPage + 4;
		}
		if (this.currentPage === 2) {
			afterPage = this.currentPage + 3;
		}
		if (this.currentPage === this.total) {
			beforePage = this.currentPage - 4;
		}
		if (this.currentPage === this.total - 1) {
			beforePage = this.currentPage - 3;
		}

		if (beforePage < 2) {
			beforePage = 2;
		}
		if (afterPage >= this.total) {
			afterPage = this.total - 1;
		}
		for (let pageNumber = beforePage; pageNumber <= afterPage; pageNumber++) {
			if (pageNumber === this.currentPage) {
				const item = createElement(
					'li',
					{ class: 'pagination-item pagination-number active' },
					createElement('span', {}, `${pageNumber}`),
				);
				this.paginationList.push(item);
			} else {
				const item = createElement(
					'li',
					{ class: 'pagination-item pagination-number' },
					createElement('span', {}, `${pageNumber}`),
				);
				this.paginationList.push(item);
			}
		}

		if (this.currentPage < this.total - 3) {
			const endDots = createElement(
				'li',
				{ class: 'pagination-item pagination-dots' },
				createElement('span', {}, '...'),
			);
			this.paginationList.push(endDots);
		}

		if (this.currentPage === this.total) {
			const lastElem = createElement(
				'li',
				{ class: 'last-num pagination-item pagination-number active' },
				createElement('span', {}, `${this.total}`),
			);
			this.paginationList.push(lastElem);
		} else {
			const lastElem = createElement(
				'li',
				{ class: 'last-num pagination-item pagination-number' },
				createElement('span', {}, `${this.total}`),
			);
			this.paginationList.push(lastElem);
		}
		return this.paginationList;
	}
}
