var mongoose = require('mongoose');
var Schema= mongoose.Schema;

mongoose.connect('mongodb://localhost/content', { useNewUrlParser: true }, () =>
  console.log("connected to db"));
mongoose.connection.on('error', (err) => {
  console.log('Error: Could not connect to MongoDB.');
});

var ProjectSchema = new Schema({
  projectId: {
    type: String
  },
  name: {
    type: String
  },
  project: {
    type: String
  },
  created_at: {
    type: String
  },
});

Project = mongoose.model('Project', ProjectSchema, 'project');

var ExtraSalarySchema = new Schema({
  pdu: {
    type: Number
  },
  level: {
    type: String
  },
  extra_hourly_rate: {
    type: Number
  },
  eu: {
    type: Number
  },
  lu: {
    type: Number
  },
});

ExtraSalary = mongoose.model('ExtraSalary', ExtraSalarySchema, 'extraSalary');

var PaidHolidaySchema = new Schema({
  pdu: {
    type: Number
  },
  level: {
    type: String
  },
  paid_holiday_hours: {
    type: Number
  },
  eu: {
    type: Number
  },
  lu: {
    type: Number
  },
});

PaidHoliday = mongoose.model('PaidHoliday', PaidHolidaySchema, 'paidHoliday');

module.exports = {
  Project: Project,
  ExtraSalary: ExtraSalary,
  PaidHoliday: PaidHoliday
};
