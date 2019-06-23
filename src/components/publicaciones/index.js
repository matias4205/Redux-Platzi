import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comentarios from './Comentarios';

const { fetchUsers: usuariosTraerTodos } = usuariosActions;
const { fetchUserPost: publicacionesTraerPorUsuario, abrirCerrarPub, traerComentarios } = publicacionesActions;

class Publicaciones extends Component {
    ponerUsuarios = () => {
        const {
            usuariosReducer,
            match: { params: {id} }
        } = this.props

        
        if(usuariosReducer.error){
            return(
                <Fatal message={usuariosReducer.error.message}/>
            );
        }
        
        if(!usuariosReducer.usuarios.length || usuariosReducer.loading) {
            return (
                <Spinner />
            );
        }

        const { name } = usuariosReducer.usuarios[id];

        return (
            <React.Fragment>
                <h1>
                    Publicaciones de { name }
                </h1>
            </React.Fragment>
        );
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: {id} }
        } = this.props
        
        if(!usuarios.length) return;
        if(usuariosReducer.error) return;
        
        if(publicacionesReducer.loading){
            return <Spinner />
        }
        if(publicacionesReducer.error){
            return <Fatal message={publicacionesReducer.error} />
        }

        if(!('publicaciones_key' in usuarios[id]) || !publicaciones.length) return; //Para cuando todavia no se trajo la info de publicaciones o cuando publicaciones_key no se agrego pero no hay ni error ni loading
        
        const { publicaciones_key } = usuarios[id];

        return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
    }

    mostrarInfo = (publicaciones, publicaciones_key, ) => (
        <React.Fragment>
            {publicaciones.map((item, com_index)=>(
                <div key={item.id} className="pub_titulo" onClick={ () => this.mostrarComentarios(publicaciones_key, com_index, item.comentarios) }>
                    <h2>{item.title}</h2>
                    <h3>{item.body}</h3>
                    {(item.abierto && <Comentarios comentarios={item.comentarios} />)}
                </div>
            ))}
        </React.Fragment>
    );

    mostrarComentarios = (publicaciones_key, com_index, comentarios) => {
        this.props.abrirCerrarPub(publicaciones_key, com_index);
        if(!comentarios.length){
            this.props.traerComentarios(publicaciones_key, com_index);
        }
    }

    async componentDidMount(){
        const { // NO PUEDO DESTRUCTURAR EL USUARIOSREDUCER YA QUE SI LO HAGO SE CREA UNA NUEVA REFERENCIA A ESTE Y NO SE ACTUALIZARIA
            publicacionesTraerPorUsuario,
            usuariosTraerTodos,
            match: { params: { id } }
        } = this.props;

        if (!this.props.usuariosReducer.usuarios.length){ 
            await usuariosTraerTodos();
        }

        if(this.props.usuariosReducer.error) return; //Aca lo corto ya que si se encuentra un error en la ejecucion de usuariosTraerTodos() publicacionesTraerPorUsuario() no podria ejecutarse, el action ERROR de usuarios se ejecuta por lo tanto el error hace display

        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[id])){
            publicacionesTraerPorUsuario(id);
        }
    }
    
    render() {
        console.log(this.props);
        return (
            <div>
                { this.ponerUsuarios() }
                { this.ponerPublicaciones() }
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrarPub,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);