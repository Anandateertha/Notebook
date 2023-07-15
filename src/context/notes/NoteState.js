import NoteContext from './NoteContext'

import { useState } from 'react'

const NoteState = (props) => {

    const host = 'http://localhost:5000';

    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    //Get the notes
    const getnotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMTJlMGUxNjQzZTJlMzRjZGU0MjZiIn0sImlhdCI6MTY4OTMzMzI2Mn0.1dBi14VgzBgvlUaaYuOu6ZgBM2U1AIHBKbuopm79Tok"
            },
        });
        const json = await response.json();
        setnotes(json)
    }

    //Add a new Note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMTJlMGUxNjQzZTJlMzRjZGU0MjZiIn0sImlhdCI6MTY4OTMzMzI2Mn0.1dBi14VgzBgvlUaaYuOu6ZgBM2U1AIHBKbuopm79Tok"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = response.json();
        setnotes(notes.concat(note))
        console.log(note)

    }

    //Delete a Note
    const deletenote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMTJlMGUxNjQzZTJlMzRjZGU0MjZiIn0sImlhdCI6MTY4OTMzMzI2Mn0.1dBi14VgzBgvlUaaYuOu6ZgBM2U1AIHBKbuopm79Tok"
            }
        });
        setnotes(notes.filter((note) => note._id !== id))
    }

    //Edit a Note
    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMTJlMGUxNjQzZTJlMzRjZGU0MjZiIn0sImlhdCI6MTY4OTMzMzI2Mn0.1dBi14VgzBgvlUaaYuOu6ZgBM2U1AIHBKbuopm79Tok"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        const newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }

        }
        setnotes(newNotes)

    }

    return (

        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState