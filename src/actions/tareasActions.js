import axios from 'axios';
import { TRAER_TODAS, LOADING, ERROR, CHANGE_TITLE, CHANGE_USERID, GUARDAR, ACTUALIZAR, CLEAN } from '../types/tareasTypes';

export const fetchTareas= () => async(dispatch) => {
    dispatch({
        type: LOADING
    });

    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    
        const tareas = {};

        data.map((item) => (
            tareas[item.userId] = {
                ...tareas[item.userId],
                [item.id]: {
                    ...item
                }
            }
        ));
        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: `Infromacion de tareas no disponible: \n${err.message}`
        });
    }
}

export const changeTitle = (title) => (dispatch) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    });
}

export const changeUserId = (id) => (dispatch) => {
    dispatch({
        type: CHANGE_USERID,
        payload: id
    });
}

export const saveTarea = (tarea) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        await axios.post('https://jsonplaceholder.typicode.com/todos', tarea);
        dispatch({
            type: GUARDAR
        })
    } catch (err){
        dispatch({
            type: ERROR,
            payload: `Intente de nuevo mas tarde: \n${err.message}`
        })
    }
}

export const editTarea = (tarea) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea.id}`, tarea);
        dispatch({
            type: GUARDAR
        })
    } catch (err){
        dispatch({
            type: ERROR,
            payload: `Intente de nuevo mas tarde: \n${err.message}`
        })
    }
}

export const toggleCheck = (usu_id, tarea_id) => (dispatch, getState) => {
    // dispatch({
    //     type: LOADING
    // })

    const { tareas } = getState().tareasReducer;
    const tareaSelecionada = tareas[usu_id][tarea_id];

    const actualizadas = {
        ...tareas
    } 
    actualizadas[usu_id] = {
        ...tareas[usu_id]
    }
    actualizadas[usu_id][tarea_id] = {
        ...tareas[usu_id][tarea_id],
        completed: !tareaSelecionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    });
}

export const deleteTarea = (tar_id) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        console.log(respuesta);
        dispatch({
            type: TRAER_TODAS,
            payload: {}
        })
    } catch (err){
        dispatch({
            type: ERROR,
            payload: `Intente de nuevo mas tarde: \n${err.message}`
        })
    }
}

export const cleanForm = () => (dispatch) => {
    dispatch({
        type: CLEAN
    })
}