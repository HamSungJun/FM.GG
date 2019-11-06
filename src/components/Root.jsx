import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../redux/store/store.js';
import Home from './Home.jsx';
import SummonerInfo from './SummonerInfo.jsx';
import history from '../history/history.js'
import {GlobalStyle} from './GlobalStyle'

const Root = () => {

    return (
        <React.Fragment>
            <GlobalStyle />
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact={true} path="/">
                                <Home />
                            </Route>
                            <Route path="/summonerInfo">
                                <SummonerInfo />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </React.Fragment>
    )
    
}


ReactDOM.render(<Root />, document.getElementById("root"));