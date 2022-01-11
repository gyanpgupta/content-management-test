const models = require('../model/schema');

addProject = async function(req, res) {
  const newProject = new models.Project ({
    ...req.body
  });

  let count = await models.Project.count();
  newProject['projectId'] = `PI${++count}`;

  const result = await newProject.save();
  res.send({ result });
}

getExtraSalary = async function(req, res) {
  try {
    let task = await models.ExtraSalary.find({})
    res.send(task);
  } catch(err) {
    res.send(err);
  }
}

getPaidHoliday = async function(req, res) {
  try {
    let task = await models.PaidHoliday.find({})
    res.send(task);
  } catch(err) {
    res.send(err);
  }
}

module.exports = {
  addProject,
  getExtraSalary,
  getPaidHoliday
};
