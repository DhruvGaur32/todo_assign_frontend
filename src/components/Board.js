import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import socket from '../utils/socket';
import TaskCard from './TaskCard';

const columns = ['Todo', 'In Progress', 'Done'];

export default function Board() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        api.get('/tasks').then(res => setTasks(res.data));
        socket.on('taskUpdate', ({ type, task, id }) => {
            setTasks(prev => {
                if (type === 'create') return [...prev, task];
                if (type === 'update') return prev.map(t => t._id === task._id ? task : t);
                if (type === 'delete') return prev.filter(t => t._id !== id);
                return prev;
            });
        });
        return () => socket.off('taskUpdate');
    }, []);
    // Drag and drop handlers
    // ...
    return (
        <div style={{ display: 'flex', gap: 16 }}>
            {columns.map(col => (
                <div key={col} style={{ flex: 1 }}>
                    <h3>{col}</h3>
                    {tasks.filter(t => t.status === col).map(task => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>
            ))}
        </div>
    );
}
