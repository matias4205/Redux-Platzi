import axios from 'axios';

export const fetchUsers = () => async(dispatch) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    dispatch({
        type: 'TRAER_USUARIOS',
        payload: data
    })
}