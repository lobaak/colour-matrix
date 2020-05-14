import { getRgbValues } from './colors';

const colors = getRgbValues();
// const colors = [ [ 1, 2, 3 ], [ 1, 2, 3 ] ];

console.log(colors[0]);

test('colors total is correct', () => {
	expect(colors.length).toBe(32768);
});

test('colors values are unique', () => {
	const uniquePairs = [ ...new Set(colors.map((c) => JSON.stringify(c))) ].map((c) => JSON.parse(c));
	expect(uniquePairs.length).toBe(colors.length);
});
