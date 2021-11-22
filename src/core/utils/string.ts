/**
 *
 * @param str
 * @returns Slice IDX ticker
 */
export const sliceId = (str: string) => {
	return str.replace('.JK', '');
};
