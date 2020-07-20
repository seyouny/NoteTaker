// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 7000;

notes = []

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
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