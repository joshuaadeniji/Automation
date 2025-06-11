import { useState, useEffect } from "react"
import axios from "axios"
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
    
    const token = localStorage.getItem('access_token')
    console.log("Token:", token)

    const handleCreate = async (e) => {
        e.preventDefault()
        
        try {

            const payload = {title, content}

            if (isEditing) {
                const res = await axios.put(`http://localhost:8000/api/notes/${editId}/`, payload , {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setNotes(notes.map(note => note.id === editId ? res.data : note))
                setIsEditing(false)
                setEditId(null)
                setAddEdit('Add')
                setWriteEdit('Write a new note')

            } else {
            const res = await axios.post('http://localhost:8000/api/notes/', {
                title,
                content
            }, {
                headers: {Authorization: `Bearer ${token}`}
            })
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
            await axios.delete(`http://localhost:8000/api/notes/${id}/`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setNotes(notes.filter(note => note.id !== id))

        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/notes/', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => setNotes(res.data))
        .catch(err => console.error(err))

    }, [token])

    return (
        <div className="notes">
            <h3 className="notes-create-list">{writeEdit}</h3>
            <div className="form-container">
                <form className="form" onSubmit={handleCreate}>
                    <input
                        className="note-title input-group"
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value) }                                
                    />
                    <textarea
                        className="note-content input-group"
                        value={content}
                        placeholder="Note Content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">{addEdit} Note</button>
                </form>
            </div>

            <h3 className="notes-create-list">Your notes show here</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notes.map(note => (
                            <tr key={note.id}>
                                <td>{note.title}</td>
                                <td>{note.content}</td>
                                <td className="edc-">
                                    <button className="edit" onClick={() => handleEdit(note)}>Edit</button>
                                    <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                                    <button className="complete" onClick={() => handleComplete(note.id)}>Complete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}
 
export default Notes
