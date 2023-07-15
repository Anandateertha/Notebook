import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { note ,updateNote} = props
    const {deletenote}=context
    

    const handledelete=(id)=>{
        deletenote(id)
    }

    return (
        <>
            <div className="col-md-3 my-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-trash" onClick={()=>handledelete(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem