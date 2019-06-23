import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';

import IndexPage from './usuarios/index';
import PublicacionesPage from './publicaciones/index';
import Menu from './Menu';

const Tareas = () => <div> Tareas </div>;

const App = () => {
  return(
    <BrowserRouter>
      <Menu>
        <Switch>
          <Route exact path="/" component={ IndexPage }/>
          <Route exact path="/publicaciones/:id" component={ PublicacionesPage }/>
          <Route exact path="/tareas" component={ Tareas }/>
        </Switch>
      </Menu>
    </BrowserRouter>
  );
}

export default App;