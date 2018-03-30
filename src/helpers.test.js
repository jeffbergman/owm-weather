import {titleCase, iconNbr } from './helpers';

describe('titleCase', () => {
	it('title cases a string that is passed', () => {
		expect(titleCase('horse feathers')).toEqual('Horse Feathers');
	});
});
