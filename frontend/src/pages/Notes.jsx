import { useState, useEffect } from "react"
import axiosInstance from "../services/axios"
import './Notes.css'

const Notes = () => {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    

    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [addEdit, setAddEdit] = useState('Add')
    const [writeEdit, setWriteEdit] = useState('Write a new note')


    const handleEdit = (note) => {
        setIsEditing(true)
        setEditId(note.id)
        setTitle(note.title)
        setContent(note.content)
        setAddEdit('Update')
        setWriteEdit('Edit note')
    }
    
    const handleComplete = (id) => {
        // Placeholder for complete functionality
        console.log("Complete note with id:", id)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        
        try {
            const payload = {title, content}

            if (isEditing) {
                const res = await axiosInstance.put(`http://localhost:8000/api/notes/${editId}/`, payload)
                setNotes(notes.map(note => note.id === editId ? res.data : note))
                setIsEditing(false)
                setEditId(null)
                setAddEdit('Add')
                setWriteEdit('Write a new note')
            } else {
                const res = await axiosInstance.post('http://localhost:8000/api/notes/', payload)
                setNotes([...notes, res.data])
            }

            setTitle('')
            setContent('')
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?")
        if (!confirmDelete) return

        try {
            await axiosInstance.delete(`http://localhost:8000/api/notes/${id}/`)
            setNotes(notes.filter(note => note.id !== id))
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        axiosInstance.get('http://localhost:8000/api/notes/')
        .then(res => setNotes(res.data))
        .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <h2 className="text-center mb-4">{writeEdit}</h2>
            <div className="form-container">
                <form onSubmit={handleCreate}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            id="title"
                            className="form-control"
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows="4"
                            value={content}
                            placeholder="Note Content"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{addEdit} Note</button>
                    {isEditing && (
                        <button
                            type="button"
                            className="btn btn-outline mt-2 btn-block"
                            onClick={() => {
                                setIsEditing(false)
                                setEditId(null)
                                setTitle('')
                                setContent('')
                                setAddEdit('Add')
                                setWriteEdit('Write a new note')
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <h3 className="mt-4 mb-3">Your Notes</h3>
            {notes.length === 0 ? (
                <div className="text-center">
                    <p>You don't have any notes yet. Create your first note above!</p>
                </div>
            ) : (
                <div className="notes-grid">
                    {notes.map(note => (
                        <div key={note.id} className="note-card card">
                            <h4>{note.title}</h4>
                            <p>{note.content}</p>
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-primary" onClick={() => handleEdit(note)}>Edit</button>
                                <button className="btn btn-secondary" onClick={() => handleDelete(note.id)}>Delete</button>
                                <button className="btn btn-outline" onClick={() => handleComplete(note.id)}>Complete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
 
export default Notes
