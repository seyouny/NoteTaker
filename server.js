// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 7000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Adding the GET methods for link directs
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json",function(err,data){
        return res.json(JSON.parse(data));
    })
});
var notes = [];

// Creating new note and adding the notes written on the page to the db.json file
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var writeNote = req.body;
    
    console.log(writeNote);
  
    notes.push(writeNote);
    fs.readFile("db/db.json",function(err,data){
        const re = JSON.parse(data)
        for (i in re){
            //
        }
    })

    res.json(notes);
  });

app.delete("/api/notes/:id", function(req, res){

});

//   * DELETE `/api/notes/:id` - Should recieve a query paramter 
//   containing the id of a note to delete. This means
//    you'll need to find a way to give each note a 
//    unique `id` when it's saved. In order to delete 
//    a note, you'll need to read all notes from the 
//    `db.json` file, remove the note with the given 
//    `id` property, and then rewrite the notes to the
//     `db.json` file.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });