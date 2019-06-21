import React, { Component } from 'react';
import axios from 'axios';

class Usuarios extends Component{
  constructor(props){
    super(props);
    this.state = {
      usuarios: []
    };
  }

  fetchUsers = async() => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.setState({
        usuarios: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount(){
    this.fetchUsers();
  }

  ponerUsuarios = () => (
    this.state.usuarios.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.website}</td>
      </tr>
    ))
  )

  render(){
    return (
      <div className="margin">
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

export default Usuarios;