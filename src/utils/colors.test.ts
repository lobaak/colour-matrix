import { getRgbValues } from './colors';

const colors = getRgbValues();

test('colors total is correct', () => {
	expect(colors.length).toBe(32768);
});

test('colors values are unique', () => {
	const unique = [ ...new Set(colors.map((c) => JSON.stringify(c))) ].map((c) => JSON.parse(c));
	expect(unique.length).toBe(colors.length);
});
