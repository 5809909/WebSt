import sum from './sum_ab';

test('adds 1 + 2 to equal 3', () => {
	const actualResult = sum(1, 2);
	const expectedResult = 3;

	expect(actualResult).toBe(expectedResult);
});
