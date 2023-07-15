import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'


export default function Alert() {
    const context = useContext(noteContext)
    const { alert } = context

    return (

        <div style={{ position: 'fixed', top: '55px', width: '100%', zIndex: 1000}}>
            {alert && <div className={`alert text alert-${alert.type} text-center alert-dismissible fade show`} role="alert" style={{color:'black'}}>
                {alert.message}
            </div>}
        </div>

    )
}
