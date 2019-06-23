import axios from 'axios';
import { TRAER_TODOS, LOADING, ERROR, TRAER_POR_USUARIO } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const fetchPosts = () => async(dispatch) => { //No lo uso porque trae todas
    dispatch({
        type: LOADING
    });

    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
        dispatch({
            type: TRAER_TODOS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
}

export const fetchUserPost = (id) => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[id].id;
    
    dispatch({
        type: LOADING
    });

    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
        
        const nuevas = data.map((item) => (
            {
                ...item,
                comentarios: [],
                abierto: false
            }
        ));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ]
    
        const publicaciones_key =  publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[id] = {
            ...usuarios[id],
            publicaciones_key
        }
        
        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicaciones_actualizadas
        });
        
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });
        
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: `Infromacion de publicaciones no disponible: \n${err.message}`
        });
    }
}

export const abrirCerrarPub = (pub_key, com_key) => (dispatch) => {
    console.log(pub_key, com_key);
}