import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import '../styles/index.css'


class Usuarios extends Component{
  componentDidMount(){
    // this.fetchUsers();
    this.props.fetchUsers();
  }

  ponerUsuarios = () => (
    this.props.usuarios.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.website}</td>
      </tr>
    ))
  )

  render(){
    return (
      <div>
        <table className="tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Correo
              </th>
              <th>
                Enlace
              </th>
            </tr>
          </thead>
          <tbody>
            { this.ponerUsuarios() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);