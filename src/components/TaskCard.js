import React from 'react';
import api from '../utils/api';

export default function TaskCard({ task }) {
    const handleSmartAssign = async () => {
        await api.post(`/tasks/${task._id}/smart-assign`);
    };
    return (
        <div className="task-card" draggable>
            <div className="task-title">{task.title}</div>
            <div className="task-desc">{task.description}</div>
            <div className="task-meta">
                Assigned: {task.assignedTo?.username ? (
                    <span>{task.assignedTo.username}</span>
                ) : (
                    <span className="unassigned-label">Unassigned</span>
                )}
            </div>
            <div className="task-actions">
                <button className="smart-assign-btn" onClick={handleSmartAssign}>Smart Assign</button>
                {/* Add edit/delete buttons here if needed */}
            </div>
        </div>

    );
}
