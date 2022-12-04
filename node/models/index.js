const { Sequelize } = require('sequelize')
const config = { DB: "studentEvaluation", USER: "root", PASSWORD: "" }
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: "localhost",
    dialect: "mysql"
})

const Teacher = require('./teacher')(sequelize, Sequelize)
const Student = require('./student')(sequelize, Sequelize)
const Group = require('./group')(sequelize, Sequelize)
const Rating = require('./rating')(sequelize, Sequelize)
Group.hasMany(Student);
Teacher.hasMany(Group);
Student.hasMany(Rating);
sequelize.sync()
module.exports = {
    Teacher,
    Student,
    Group,
    Rating
}
