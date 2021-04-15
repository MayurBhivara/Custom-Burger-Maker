import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3d306-default-rtdb.firebaseio.com/    '
});

export default instance;