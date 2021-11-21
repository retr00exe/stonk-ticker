/**
 * @param date
 * @returns filter weekend & weekday
 *
 */
export const isWeekend = (date: Date): boolean => {
	const dayOfWeek = date.getDay();
	return dayOfWeek === 6 || dayOfWeek === 0;
};
