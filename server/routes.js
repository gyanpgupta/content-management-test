var controller = require('./controller');

module.exports = function (app) {
  app.post('/addProject', controller.addProject);
  app.get('/getExtraSalary', controller.getExtraSalary);
  app.get('/getPaidHoliday', controller.getPaidHoliday);
};
