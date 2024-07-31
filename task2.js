const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const axios = require('axios');

let characters;
let spells;
let staff;
let students;
let combinedData = []
let combinedFullData = []
// async function getData() {
//     const response = await axios.get('https://hp-api.onrender.com/api/characters');
//     data = response.data;
//     app.listen(8000)
// }
app.use(bodyParser.urlencoded({ extended: true }))
axios.get("https://hp-api.onrender.com/api/characters")
    .then((response) => {
        characters = response.data
        for (let i = 0; i < characters.length; i++) {
            combinedData.push(characters[i].name);
            combinedFullData.push(characters[i])
        }
        app.listen(8000);
})

axios.get("https://hp-api.onrender.com/api/spells")
    .then((response) => {
        spells = response.data
        for (let i = 0; i < spells.length; i++) {
            combinedData.push(spells[i].name);
            combinedFullData.push(spells[i])
        }
})

axios.get("https://hp-api.onrender.com/api/characters/staff")
    .then((response) => {
        staff = response.data
        for (let i = 0; i < staff.length; i++) {
            combinedData.push(staff[i].name);
            combinedFullData.push(staff[i])
        }
})

axios.get("https://hp-api.onrender.com/api/characters/students")
    .then((response) => {
        students = response.data
        for (let i = 0; i < students.length; i++) {
            combinedData.push(students[i].name);
            combinedFullData.push(students[i])
        }
})


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
let data = {data: combinedData}
    res.render("task2", {data: JSON.stringify(data)});
})

app.post('/', (req, res) => {
    for (let i = 0; i < combinedFullData.length; i++) {
        if (combinedFullData[i].name == req.body.input) {
            res.send(combinedFullData[i])
        }
    }
    res.send('could not find character')
})
