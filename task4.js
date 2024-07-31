const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Student = require("./models/student")

const dbURI = "mongodb+srv://node_project_user:Newtomongodb!@cluster0.fszmfbt.mongodb.net/hogwarts_characters?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI)
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index2")
})

app.post('/', async (req, res) => {
    const student = new Student({
        id: req.body.characterId,
        name : req.body.characterName,
        gender : req.body.characterGender,
        house : req.body.characterHouse,
        wizard : (req.body.characterWizard === 'true')

    })
    let idAlreadyExists = true;
    // Student.find()

    try {
        const findResult = await Student.find();
        for (let i = 0; i < findResult.length; i++) {
        if (findResult[i].id == student.id) {
            res.send("Character with this id already exists.");
            }
        }
        idAlreadyExists = false;

    }catch (e) {
        console.log(e);
    }
    

    
    if (!idAlreadyExists) {
        console.log('reached here')
        student.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {

                console.log(err)
            })
    }
    else {
        console.log(idAlreadyExists);
    }
})

app.get('/view-all', (req, res) => {
    Student.find()
        .then((result) => {
            // res.send(result);
            console.log(result[0])
            res.render('view-all', {result: result})
        })
})

app.get('/delete', (req, res) => {
    res.render('delete')
})

app.post('/delete', (req, res) => {
    Student.deleteOne({id: req.body.characterId})
        .then((result) => {
            res.send(result);
        })

}) 