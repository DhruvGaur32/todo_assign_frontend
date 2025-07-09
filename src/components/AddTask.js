import React, { useState } from 'react';
import api from '../utils/api';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/tasks', { title, description, priority });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            // Optionally: emit a socket event or refetch tasks if not handled elsewhere
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to add task');
        }
        setLoading(false);
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <h4>Add New Task</h4>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
            />
            <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
            {error && <div className="form-error">{error}</div>}
        </form>
    );
}
