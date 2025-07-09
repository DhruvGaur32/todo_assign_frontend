import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL.replace('/api', ''), {
    auth: { token: localStorage.getItem('token') }
});
export default socket;
