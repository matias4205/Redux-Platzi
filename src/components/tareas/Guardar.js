import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tareasActions from '../../actions/tareasActions';
const { changeUserId, changeTitle, saveTarea, editTarea, fetchTareas, cleanForm } = tareasActions;

class Guardar extends Component {
    handleChangeUserId = (event) => {
        this.props.changeUserId(event.target.value)
    }

    handleChangeTitle = (event) => {
        this.props.changeTitle(event.target.value)
    }

    handleSaveTarea = () => {
        const { 
            match: { params: { usu_id, tar_id } },
            usuario_id, 
            titulo,
            tareas,
            saveTarea,
            editTarea
        } = this.props;

        const nuevaTarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        }

        if(usu_id && tar_id){
            const tarea = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nuevaTarea,
                completed: tarea.completed,
                id: tarea.id
            }
            editTarea(tarea_editada)
        }else{
            saveTarea(nuevaTarea);
        }
    }

    disableButton = () => {
        const { usuario_id, titulo, loading } = this.props;

        if(usuario_id && titulo && !loading) return false;

        return true;
    }    

    mostrarAccion(){
        const { loading, error } = this.props;

        if(loading){
            return <Spinner />
        }
        if(error){
            return <Fatal message={ error } />
        }
    }

    componentDidMount(){
        const {
            match: { params: { usu_id, tar_id } },
            tareas,
            changeUserId,
            changeTitle,
            cleanForm
        } = this.props;

        // if(!Object.keys(tareas).length){
        //     this.props.fetchTareas();
        // }

        if( usu_id && tar_id ){
            changeUserId(tareas[usu_id][tar_id].userId)
            changeTitle(tareas[usu_id][tar_id].title);
        }else{
            cleanForm();
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                { (this.props.redirect) && <Redirect to='/tareas' /> }
                <h1>
                    Guardar Tarea
                </h1>

                Usuario id: 
                <input type="number" value={this.props.usuario_id} onChange={ this.handleChangeUserId }/>
                <br/><br/>
                Titulo:
                <input type="text" value={this.props.titulo} onChange={ this.handleChangeTitle } />
                <br/><br/>
                <button onClick={ this.handleSaveTarea } disabled={ this.disableButton() }>
                    Guardar
                </button>
                { this.mostrarAccion() }
            </div>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.tareasReducer;
}

const mapDispatchToProps = {
    changeUserId, 
    changeTitle,
    saveTarea,
    editTarea,
    fetchTareas,
    cleanForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Guardar);