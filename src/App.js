import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './storage/Storage';
import { Provider } from 'react-redux';

import Pegavar from './components/Pegavar';
import Beta from './components/Beta';
import Test from './components/Test';
import Template from './templates/template';
import TestStorage from './storage/TestStorage';
/*
const Cap = ({ match }) => (
  <Pegavar doom={match.params.doom}></Pegavar>
)
*/
function App() {

  return (
    <main>
    <Provider store={store}>

    <Router>
    <Switch>
      <Route exact path="/" component={Beta}/>
      <Route exact path="/test" component={Test}/>
      <Route path="/parse">
      <Route path="/:doo/:doom/:dom"  component={Pegavar}/>
      </Route>    
      <Route path="/template" component={Template}></Route>
      <Route path="/wath" component={TestStorage}/>
    </Switch>
    </Router>

    </Provider>
    </main>

    ///<Beta></Beta>

  );
}

export default App;
