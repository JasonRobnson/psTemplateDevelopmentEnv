import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
	it('should pass', () => {
		expect(true).to.be.true;
	});
});

describe('index.html', () => {
	it('should have h1 that says Users', done => {
		const index = fs.readFileSync('./src/index.html', 'utf-8');

		// can also use an Array of Javascript files to load into JSDOM if your FE code uses fetch then need to use isomorphic fetch instead because it won't be available in the node env.
		jsdom.env(index, (err, window) => {
			const h1 = window.document.getElementsByTagName('h1')[0];
			expect(h1.innerHTML).to.equal('Users');
			done();
			window.close();
		});
	});
});
