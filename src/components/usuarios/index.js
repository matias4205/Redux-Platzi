import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Tabla from './Tabla';

class Usuarios extends Component{
  componentDidMount(){
    if (!this.props.usuarios.length){
      this.props.fetchUsers();
    }
  }

  render(){
    if(this.props.loading) {
      return (
        <Spinner />
      );
    }

    if(this.props.error){
      return(
        <Fatal message={this.props.error}/>
      );
    }

    return (
      <React.Fragment>
        <h1>Usuarios</h1>
        <Tabla />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);