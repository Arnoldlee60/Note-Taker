const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

const allNotes = require('./db/db.json');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
/*
require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);
*/
//create
//delete

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});