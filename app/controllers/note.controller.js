const Note = require('../models/note.model.js');
var http = require('http');

exports.demo = (req, res) => {
   // var city_name = request.body.city_name;
    //if(city_name in city_name_done){
      //  return;
    //}
    //else {
        //const note = new Note({
         //   city_name: req.body.city_name || "Untitled Note", 
        
        //}); 
       // city_name_done.push(city_name);
        console.log('city_name: ');

        let request = require('request');


        let apiKey = '4a48cc1e907db30402855363c6bd0486';

        let city = 'portland';
        
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        
        
        
        request(url, function (err, response, body) {
        
          if(err){
        
            console.log('error:', error);
        
          } else {
        
            console.log('body:', body);
            res.send(body);
        
          }
        
        });
       
    };
        











// Create and Save a new Note
exports.create = (req, res) => {


    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });


    }
    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });


};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
};
 

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });



};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {


    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
// Find note and update it with the request body
Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
}, {new: true})
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });
});
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });



};
