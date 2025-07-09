import React, { useState } from 'react';
import api from '../utils/api';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        await api.post('/users/register', { username, password });
        alert('Registered! Please login.');
    };
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}
