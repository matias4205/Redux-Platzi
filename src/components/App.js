import { Route, Switch, BrowserRouter } from 'react-router-dom';
import React from 'react';

import indexPage from './index';

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ indexPage }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;