const express = require("express")
const cors = require("cors")
const { StudentsController } = require("./controlers/StudentsControler")
const { UserController } = require("./controlers/UserController")
const { TeacherControler } = require("./controlers/TeacherControler")
const { RatingControler } = require("./controlers/RatingControler")

const app = express()
const { Student, Teacher, Group, Rating } = require("./models")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
passport.use(new LocalStrategy({ usernameField: 'email' },
    UserController.LoginCheck
))
passport.serializeUser(function (user, done) {
    done(null, { id: user.id, verify: user.verify });
});

passport.deserializeUser(async function (data, done) {
    let user = data.verify == 0 ? await Student.findByPk(data.id) : await Teacher.findByPk(data.id);
    done(null, user);
})
app.post("/login", UserController.Login)
app.post('/logOut', UserController.Logout)
app.post('/addUser', UserController.addUser)
app.post("/getUser", UserController.GetUser)
app.post("/getStudents", StudentsController.GetStudent)
app.post("/getGroups", TeacherControler.GetGroup)
app.post('/updateReting', RatingControler.UpdateRating)

app.listen(5000)