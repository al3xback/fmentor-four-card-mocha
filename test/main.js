import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a title element with a class of 'card'", () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionTitleEl = sectionHeadEl.querySelector('.section__title');

		assert.ok(sectionTitleEl);
	});

	it("should have a subtitle element with a class of 'section__subtitle'", () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionSubtitleEl =
			sectionHeadEl.querySelector('.section__subtitle');

		assert.ok(sectionSubtitleEl);
	});

	it("should have a description element with a class of 'section__desc'", () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionDescEl = sectionHeadEl.querySelector('.section__desc');

		assert.ok(sectionDescEl);
	});

	it('should have four card list item elements', () => {
		const cardListItemEls = document.querySelectorAll('.card__list-item');

		assert.equal(cardListItemEls.length, 4);
	});
});
