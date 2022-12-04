const { Group } = require("../models")
class TeacherControler {
    static async GetGroup(req, res) {

        const id = req.body.id
        const group = await Group.findAll({
            where: {
                teacherId: id
            },
            include: { all: true, nested: true }
        })
        // console.log(group);
        res.send(group)
    }

}

module.exports = { TeacherControler }