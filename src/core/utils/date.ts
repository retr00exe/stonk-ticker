import moment from 'moment';

/**
 * @param date
 * @returns filter weekend & weekday
 *
 */
export const isWeekend = (date: Date): boolean => {
	const dayOfWeek = date.getDay();
	return dayOfWeek === 6 || dayOfWeek === 0;
};

/**
 *
 * @param date
 * @param market
 * @returns detect if the market is open for trade
 */
export const isMarketOpen = (date: Date, market: string): boolean => {
	const m: any = {};
	switch (market) {
		case 'IDX':
			m.opening1 = [moment('09:15', 'HH:mm'), moment('11:15', 'HH:mm')];
			m.opening2 = [moment('13:45', 'HH:mm'), moment('15:00', 'HH:mm')];
			return (
				(m.opening1[0].isBefore(moment(date)) && m.opening1[1].isAfter(moment(date))) ||
				(m.opening2[0].isBefore(moment(date)) && m.opening2[1].isAfter(moment(date)))
			);
		case 'Nasdaq':
			m.opening = [moment('16:00', 'HH:mm'), moment('07:00', 'HH:mm')];
			return m.opening[0].isBefore(moment(date)) || m.opening[1].isAfter(moment(date));
	}
};
