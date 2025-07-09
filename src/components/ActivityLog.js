import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import socket from '../utils/socket';

export default function ActivityLog() {
    const [actions, setActions] = useState([]);
    useEffect(() => {
        api.get('/actions').then(res => setActions(res.data));
        socket.on('taskUpdate', () => {
            api.get('/actions').then(res => setActions(res.data));
        });
        return () => socket.off('taskUpdate');
    }, []);
    return (
        <div>
            <h4>Activity Log</h4>
            <ul>
                {actions.map(a => (
                    <li key={a._id}>
                        {a.user?.username} {a.action} "{a.task?.title}" at {new Date(a.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
