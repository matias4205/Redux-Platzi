import axios from 'axios';
import { TRAER_TODOS, LOADING, ERROR } from '../types/usuariosTypes';

export const fetchUsers = () => async(dispatch) => {
    dispatch({
        type: LOADING
    });

    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    
        dispatch({
            type: TRAER_TODOS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: `Infromacion de usuario no disponible: \n${err.message}`
        });
    }
}