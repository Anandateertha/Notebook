import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import '../styles/Notes.css'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getnotes, editnote } = context
    const navigate=useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes()
        }
        else{
            navigate('/login')
        }
    }, [])

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const ref = useRef(null)
    const refClose = useRef(null)

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content back">
                        <div className="modal-header">
                            <h5 className="modal-title text" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={handleChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={handleChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={handleChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 text">
                <h2>Your Note's</h2>
                {notes.length === 0 ? "No notes to be dispalyed" : notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes