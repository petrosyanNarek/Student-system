const passport = require("passport")
const bcrypt = require('bcrypt');
const { Student, Rating, Teacher } = require('../models')

class UserController {
    static async addUser(req, res) {
        const us = req.body
        const userFind = await Student.findOne({ where: { email: us.email } })
        if (userFind) {
            res.send(false)
        } else {
            us.password = await bcrypt.hash(us.password, 10)
            let result = await Student.create({ ...us })
            for (let i = 0; i < 12; i++) {
                Rating.create({
                    comment: "",
                    studentId: result.id
                })
            }
            res.send(true)
        }

    }
    static async GetUser(req, res) {
        res.send({ user: req.user ? req.user : {} })
    }

    static async LoginCheck(email, password, done) {
        let user = await Student.findOne({ where: { email: email } })
        let data = user ? user : await Teacher.findOne({ where: { email: email } })
        if (!data) {
            return done(null, false);
        }
        let result = await bcrypt.compare(password, data.password)
        if (!result) {
            return done(null, false)
        }
        return done(null, data)
    }
    static Login(req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) {
                        res.send({ error: 'Something went wrong' })
                    }
                    res.send({ verify: true, user: req.user })
                })
            }
            else {
                res.send({ error: 'User Not Found' })
            }


        })(req, res, next)
    }
    static Logout(req, res) {
        console.log(req);
        req.logout()
        res.send({ status: "OK" })
    }
}
module.exports = { UserController }