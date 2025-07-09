import React from 'react';
import Board from '../components/Board';
import ActivityLog from '../components/ActivityLog';
import AddTask from '../components/AddTask';

export default function BoardPage() {
    return (
        <div className="page-board">
            <h2 className="board-title">Collaborative Kanban Board</h2>
            <AddTask />
            <div className="board-container">
                <Board />
            </div>
            <div className="activity-log">
                <ActivityLog />
            </div>
        </div>
    );
}


