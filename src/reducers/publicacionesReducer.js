import { ERROR, LOADING, TRAER_POR_USUARIO, ACTUALIZAR, COMENTARIO_LOADING, COMENTARIOS_ERROR, COMENTARIOS_ACTUALIZAR } from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    loading: false,
    error: undefined,
    comentariosState: {
        loading: false,
        error: undefined
    }
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
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

        case TRAER_POR_USUARIO:
            return {
                ...state, 
                publicaciones: action.payload, 
                loading: false
            }
        
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload
            }

        case COMENTARIO_LOADING:
                return {
                    ...state,
                    comentariosState: {
                        ...state.comentariosState,
                        loading: true
                    }
                }
        
        case COMENTARIOS_ERROR:
                return {
                    ...state,
                    comentariosState: {
                        loading: false,
                        error: action.payload
                    }
                }

        case COMENTARIOS_ACTUALIZAR:
                return {
                    ...state,
                    publicaciones: action.payload,
                    comentariosState:{
                        ...state.comentariosState,
                        loading: false
                    }
                }
        default:
            return state;
    }
}