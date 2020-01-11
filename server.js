const express = require("express")
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

notesArr = []

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get('/api/notes', (req, res)=>{
    res.json(notesArr)
});
app.post('/api/notes', (req, res)=>{
    newNote = req.body
    notesArr.push(newNote)
    notesArr.forEach((item, i) => {
        item.id = i;
    });
    res.send("done")
});

app.delete('/api/notes/:id',(req,res)=>{
    console.log(req.params.id);
    id = Number(req.params.id)
    notesArr = notesArr.filter(function(note, index, arr){
        return note.id != id; 
    })
    res.send(notesArr);
})

app.listen(PORT, function(){
    console.log("listening on port" + PORT);
});