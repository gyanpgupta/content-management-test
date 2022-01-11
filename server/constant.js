const extraSalaryData = [{
	pdu: 18,
	level: 'L1',
	extra_hourly_rate: 0.25,
	eu: 1440,
	lu: 36
}, {
	pdu: 27,
	level: 'L2',
	extra_hourly_rate: 0.50,
	eu: 2160,
	lu: 54
}, {
	pdu: 36,
	level: 'L3',
	extra_hourly_rate: 0.75,
	eu: 2880,
	lu: 72
}, {
	pdu: 45,
	level: 'L4',
	extra_hourly_rate: 1.00,
	eu: 3600,
	lu: 90
}, {
	pdu: 63,
	level: 'L5',
	extra_hourly_rate: 1.50,
	eu: 5040,
	lu: 126
}, {
	pdu: 81,
	level: 'L6',
	extra_hourly_rate: 2.00,
	eu: 6480,
	lu: 162
}, {
	pdu: 117,
	level: 'L7',
	extra_hourly_rate: 3.00,
	eu: 9360,
	lu: 234
}, {
	pdu: 144,
	level: 'L8',
	extra_hourly_rate: 4.00,
	eu: 11520,
	lu: 288
}];

const paidHolidayData = [{
	pdu: 18,
	level: 'L1',
	paid_holiday_hours: 0,
	eu: 1440,
	lu: 36
}, {
	pdu: 27,
	level: 'L2',
	paid_holiday_hours: 0,
	eu: 2160,
	lu: 54
}, {
	pdu: 36,
	level: 'L3',
	paid_holiday_hours: 0,
	eu: 2880,
	lu: 72
}, {
	pdu: 45,
	level: 'L4',
	paid_holiday_hours: 8,
	eu: 3600,
	lu: 90
}, {
	pdu: 63,
	level: 'L5',
	paid_holiday_hours: 24,
	eu: 5040,
	lu: 126
}, {
	pdu: 81,
	level: 'L6',
	paid_holiday_hours: 36,
	eu: 6480,
	lu: 162
}, {
	pdu: 117,
	level: 'L7',
	paid_holiday_hours: 48,
	eu: 9360,
	lu: 234
}, {
	pdu: 144,
	level: 'L8',
	paid_holiday_hours: 60,
	eu: 11520,
	lu: 288
}];

module.exports = {
	extraSalaryData,
	paidHolidayData
}
