const { Student } = require("../models")
class StudentsController {
    static async GetStudent(req, res) {
        // console.log(req.body);
        const id = req.body.id
        console.log(id);
        const students = await Student.findAll({
            where: {
                groupId: id
            },
            include: { all: true, nested: true }
        })
        res.send(students)
    }
}

module.exports = { StudentsController }