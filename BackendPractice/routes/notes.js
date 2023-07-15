const express = require('express');
const Note = require('../models/Notes')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE 1 : Accessing a Note of the user using : GET '/api/notes/fetchallnotes'. Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json( notes )

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})

//ROUTE 2 : Adding a new Note of the user using : POST '/api/notes/addnote'. Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const { title, description, tag } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.send(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 3 : Updating a existing Note of the user using : PUT '/api/notes/updatenote'. Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body

        const newNote = {}

        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send('Not Found')
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')

    }



})

//ROUTE 4 : Deleting a existing Note of the user using : DELETE '/api/notes/deletenote'. Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send('Not Found')
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router