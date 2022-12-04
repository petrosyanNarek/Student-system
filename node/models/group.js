module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING,
        },
        maxCount: {
            type: Sequelize.INTEGER,
            defaultValue: 6

        },
        teacherId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'teacher',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    return Group
}