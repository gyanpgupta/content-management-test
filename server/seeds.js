var mongoose = require('mongoose');

const models = require('./model/schema');
const { extraSalaryData, paidHolidayData } = require("./constant");

mongoose.connect('mongodb://localhost/content', { useNewUrlParser: true }, () =>
  console.log("connected to db"));
mongoose.connection.on('error', (err) => {
  console.log('Error: Could not connect to MongoDB.');
});

async function seedDB() {
	try {
		await models.ExtraSalary.deleteMany({});
		await models.PaidHoliday.deleteMany({});

		await models.ExtraSalary.insertMany(extraSalaryData);
		await models.PaidHoliday.insertMany(paidHolidayData);

		mongoose.disconnect('mongodb://localhost/content');
	} catch (err) {
		console.log(err);
	}
};

seedDB();
