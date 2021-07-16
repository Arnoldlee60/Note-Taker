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
require("./routes/apiRoute")(app); //might be wrong?
require("./routes/htmlRoute")(app);
*/
//create
//delete
function create(body, notesArray) {
    const newNote = body;

    if (!Array.isArray(notesArray)){ //if not array
        notesArray = [];
    }

    if (notesArray.length == 0){
        notesArray.push(0);
    }

    body.id = notesArray[0];
    notesArray[0]++; //increment
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2) 
    );
    return newNote;
}

function remove(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
        //here
    }
}

app.post('/api/notes', (req, res) => {
    const newNote = create(req.body, allNotes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    remove(req.params.id, allNotes);
    res.json(true);
});   


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});