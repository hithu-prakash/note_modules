const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3999


//es6 object destructuring
const { Schema , model, connect} = mongoose

connect('mongodb://127.0.0.1:27017/notes-app-dec23')
 .then(() => {
    console.log('connected to db')
 })

 .catch((err) => {
    console.log('error connectiong to db' ,err)
 })

 

/*const notes = [
    {id: 1, note: 'my note'},
    {id:2, note:'my file'}
]*/

//enable express to parse incoming json data
app.use(express.json())

//create a schema - identifying the fields for the document - body

const noteSchema = new Schema ({
    body :String
})

//create a model - constructor function
const Note = model('Note' , noteSchema)

 
//request handler - list all notes
app.get('/list-notes',(req,res) => {
    Note.find()
       .then((notes) => {
           res.json(notes)
       })

       .catch((err)=> {
        res.json(err)
       })
})

//request handler - create a note
app.post('/create-notes', (req,res) =>{
    const body = req.body //const { body } =req
    const note = new Note(body)
    note.save()
      .then((obj) => {
        res.json(obj)
      })
      .catch((err) => {
        res.json(err)
      })
})

/*app.post('/create-notes', (req, res) => {
    const body = req.body
    const note = {
        id : Number(new Date()),
        data: body.note
    }
    notes.push(note)
    res.json(note)
})
//request handler - remove a note

app.delete('/remove-note/:id' ,(req , res) => {
    const id = req.params.id
    res.json(id)
    const index = notes.findIndex(function(ele) {
        return ele.id == id
    })
    if(index >= 0) {
        const result = notes.splice(index, 1)
        res.json(result[0])
    } else {
        res.status(404).json ( { notice: 'record not found'})
    }
    

})*/





app.listen(port,() => {
    console.log('notes app on running on port' , port)
})


//windows npm install -g nodemon