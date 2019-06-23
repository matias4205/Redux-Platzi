import { TRAER_TODAS, LOADING, ERROR, CHANGE_TITLE, CHANGE_USERID, GUARDAR, ACTUALIZAR, CLEAN } from '../types/tareasTypes';

const INITIAL_STATE = {
    tareas: [],
    loading: false,
    error: undefined,
    usuario_id: '',
    titulo: '',
    redirect: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TRAER_TODAS:
            return {
                ...state, 
                tareas: action.payload, 
                loading: false,
                redirect: false
            }

        case LOADING:
            return {
                ...state, 
                loading: true
            }

        case ERROR:
            return {
                ...state, 
                error: action.payload, 
                loading: false
            }

        case CHANGE_USERID:
            return {
                ...state,
                usuario_id: action.payload
            }

        case CHANGE_TITLE:
            return {
                ...state,
                titulo: action.payload
            }
        
        case GUARDAR:
            return {
                ...state,
                loading: false,
                error: undefined,
                tareas: {},
                redirect: true,
                usuario_id: '',
                titulo: '',
            }
        
        case ACTUALIZAR:
            return {
                ...state,
                tareas: action.payload
            }

        case CLEAN:
            return {
                ...state,
                usuario_id: '',
                titulo: '',
            }

        default:
            return state;
    }
}