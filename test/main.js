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
		const cardsSummaryTitleEl = sectionHeadEl.querySelector(
			'.cards-summary__title'
		);

		assert.ok(cardsSummaryTitleEl);
	});

	it("should have a subtitle element with a class of 'cards-summary__subtitle'", () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionSubtitleEl = sectionHeadEl.querySelector(
			'.cards-summary__subtitle'
		);

		assert.ok(sectionSubtitleEl);
	});

	it("should have a description element with a class of 'cards-summary__desc'", () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionDescEl = sectionHeadEl.querySelector(
			'.cards-summary__desc'
		);

		assert.ok(sectionDescEl);
	});

	it('should have four card list item elements', () => {
		const cardListItemEls = document.querySelectorAll('.card');

		assert.equal(cardListItemEls.length, 4);
	});
});
