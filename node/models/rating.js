module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define('rating', {
        digit: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        comment: {
            type: Sequelize.STRING
        },
        studentId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'student',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    return Rating
}