import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as tareasActions from '../../actions/tareasActions';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

class Tareas extends Component {
    mostrarContenido = () => {
        const { tareas, loading, error } = this.props;

        if(error){
            return <Fatal message={this.props.error} /> 
        }
        
        if(loading){
            return <Spinner />
        }

        return Object.keys(tareas).map((item, key)=>(
            <li key={key}>
                <h2>
                    Usuario {item}
                </h2>
                <div className="Contenedor Tareas">
                    <ul>
                        {this.ponerTareas(item)}
                    </ul>
                </div>
            </li>
        ));
        
    }

    ponerTareas = (usu_id) => {
        const { tareas, toggleCheck, deleteTarea } = this.props;
        const tareas_por_usuario = {
            ...tareas[usu_id]
        }

        return Object.keys(tareas_por_usuario).map((tarea_id) => (
            <li key={tarea_id}>
                <input type="checkbox" defaultChecked={tareas_por_usuario[tarea_id].completed} onChange={ () => toggleCheck(usu_id, tarea_id)}/>
                {tareas_por_usuario[tarea_id].title}
                <button className="m_left">
                    <Link to={`/tareas/guardar/${usu_id}/${tarea_id}`}>
                        Editar
                    </Link>
                </button>
                <button className="m_left" onClick={ () => deleteTarea(tarea_id) } >
                    Eliminar
                </button>
            </li>
        ));
    }

    componentDidMount(){
        if(!Object.keys(this.props.tareas).length){
            this.props.fetchTareas();
        }
    }

    componentDidUpdate(){
        const { loading, tareas, fetchTareas } = this.props;

        if(!Object.keys(tareas).length && !loading){ //MUY IMPORTANTE TENER EN CUENTA EL LOADING EN AGREGAR YA QUE SE VA A EJECUTAR CUANDO CAMBIEMOS EL ESTADO A CARGANDO HACIENDO RENDERS DE MAS
            fetchTareas();
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <button>
                    <Link to="/tareas/guardar">
                        Agregar
                    </Link>
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.tareasReducer;
} 

export default connect(mapStateToProps, tareasActions)(Tareas);