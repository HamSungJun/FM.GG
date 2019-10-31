import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../redux/store/store.js';
import Home from './Home.jsx';
import SummonerInfo from './SummonerInfo.jsx';
import history from '../history/history.js'
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "NotoSansKR";
}

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 100;
//   src: url(${require('../../assets/NotoSansKR-Thin-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 300;
//   src: url(${require('../../assets/NotoSansKR-Light-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 350;
//   src: url(${require('../../assets/NotoSansKR-DemiLight-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 400;
//   src: url(${require('../../assets/NotoSansKR-Regular-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 500;
//   src: url(${require('../../assets/NotoSansKR-Medium-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 700;
//   src: url(${require('../../assets/NotoSansKR-Bold-Hestia.woff')});
// }

// @font-face{
//   font-family: 'NotoSansKR';
//   font-style: normal;
//   font-weight: 900;
//   src: url(${require('../../assets/NotoSansKR-Black-Hestia.woff')});
// }
`

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