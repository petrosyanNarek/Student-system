module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define('teacher', {
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        verify: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    return Teacher
}