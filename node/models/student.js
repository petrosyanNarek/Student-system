module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        groupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'group',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        verify: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    return Student
}