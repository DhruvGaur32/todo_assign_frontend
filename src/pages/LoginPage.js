import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/'); // Redirect to the board page ("/")
        } catch (error) {
            alert(error.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
}
