const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const fileReader = require('fs');
const mongoose = require('mongoose');
const Student = require("./models/student")

const dbURI = "mongodb+srv://node_project_user:Newtomongodb!@cluster0.fszmfbt.mongodb.net/hogwarts_characters?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/', (req, res) => {
    const student = new Student({
        id: req.body.characterId,
        name : req.body.characterName,
        gender : req.body.characterGender,
        house : req.body.characterHouse,
        wizard : (req.body.characterWizard === 'true')

    })
    student.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/view-all', (req, res) => {
    Student.find()
        .then((result) => {
            // res.send(result);
            // console.log(result.length)
            res.render('view-all', {result: result})
        })
})