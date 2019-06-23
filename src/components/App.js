import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';

import IndexPage from './usuarios/index';
import PublicacionesPage from './publicaciones/index';
import Tareas from './tareas/index';
import TareasGuardar from './tareas/Guardar';
import Menu from './Menu';

const App = () => {
  return(
    <BrowserRouter>
      <Menu>
        <Switch>
          <Route exact path="/" component={ IndexPage }/>
          <Route exact path="/publicaciones/:id" component={ PublicacionesPage }/>
          <Route exact path="/tareas" component={ Tareas }/>
          <Route exact path="/tareas/guardar" component={ TareasGuardar }/>
          <Route exact path="/tareas/guardar/:usu_id/:tar_id" component={ TareasGuardar }/>
        </Switch>
      </Menu>
    </BrowserRouter>
  );
}

export default App;