import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../redux/store/store.js';
import Home from './Home.jsx';
import '../style/common.css'

const Root = () => {

    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
    
}


ReactDOM.render(<Root />, document.getElementById("root"));