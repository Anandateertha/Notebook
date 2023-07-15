import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import '../styles/AddNote.css'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addnote } = context

    

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    }

    return (
        <div className='my-3 text topp'>
            <h1 className='inotebook center'>iNoteBook</h1>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={handleChange} value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} value={note.tag} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote