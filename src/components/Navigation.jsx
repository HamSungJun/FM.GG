import React from 'react';
import Logo from './Logo.jsx';
import {connect} from 'react-redux';
import {Navbar, NavbarItem, NavText, NavSearch} from '../styled/StyledComponents';
import {TiChartLineOutline} from 'react-icons/ti';
import {MdSearch} from 'react-icons/md';
import * as summonerAction from '../redux/actions/summonerAction';
import {withRouter} from 'react-router-dom';

class Navigation extends React.Component{

    constructor(props){
        super(props);
        this.handleRouteToHome = this.handleRouteToHome.bind(this);
    }

    handleRouteToHome(){
        return this.props.history.push('/');
    }

    render(){
        let {summonerState, summonerDispatch} = this.props;
        return(
            <Navbar>
                <NavbarItem onClick={this.handleRouteToHome} title={"홈"}>
                    <Logo logoType={"Nav"} color={"white"}/>
                </NavbarItem>
                <NavbarItem title={"소환사 통계"}>
                    <NavText>
                        <TiChartLineOutline />
                    </NavText>
                </NavbarItem>
                <NavbarItem>

                </NavbarItem>
                <NavbarItem>
                    <NavSearch
                        searchShow={this.props.searchShow}
                        value={summonerState.summonerName}
                        onChange={summonerDispatch.typeSummoner}
                        onKeyPress={summonerDispatch.fetchSummoner}
                        placeholder={"닉네임 입력..."}>
                    </NavSearch>
                </NavbarItem>
            </Navbar>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        summonerState : state.summoner
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        summonerDispatch : {
            typeSummoner(event){
                dispatch(summonerAction.typeSummoner(event.target.value))
            },
            fetchSummoner(event){
                const keyCode = event.which || event.keyCode;
                if(keyCode === 13){
                    dispatch(summonerAction.fetchSummoner());
                }
            }
        }
    }
}

Navigation = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

export default Navigation;