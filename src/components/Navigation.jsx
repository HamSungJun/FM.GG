import React from 'react';
import Logo from './Logo.jsx';
import {connect} from 'react-redux';
import {Navbar, NavbarItem, NavText, NavSearch, NavStatusIcon, NavbarGridItem} from '../styled/StyledComponents';
import {TiChartLineOutline} from 'react-icons/ti';
import {FaStore, FaCircleNotch} from 'react-icons/fa'
import * as summonerAction from '../redux/actions/summonerAction';
import * as lolStatusAction from '../redux/actions/lolStatusAction';
import {withRouter} from 'react-router-dom';

class Navigation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            statusFetcherId : null
        }
        this.handleRouteToHome = this.handleRouteToHome.bind(this);
    }

    componentDidMount(){
        this.props.lolStatusDispatch.fetchLolStatus();
        return this.setState({
            statusFetcherId : setInterval(this.props.lolStatusDispatch.fetchLolStatus,20000)
        });
    }

    componentWillUnmount(){
        return clearInterval(this.state.statusFetcherId);
    }

    handleRouteToHome(){
        return this.props.history.push('/');
    }

    render(){
        let {
            summonerState,
            summonerDispatch,
            lolStatusState,
            lolStatusDispatch} = this.props;
        return(
            <Navbar searchShow={this.props.searchShow}>
                <NavbarItem onClick={this.handleRouteToHome} title={"홈"}>
                    <Logo logoType={"Nav"} color={"white"}/>
                </NavbarItem>
                <NavbarItem title={"소환사 통계"}>
                    <NavText>
                        <TiChartLineOutline />
                    </NavText>
                </NavbarItem>
                <NavbarItem></NavbarItem>
                <NavbarGridItem>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus[0] ? lolStatusState.lolStatus[0].status : null}isFetching={lolStatusState.isFetching}
                    title={`서버 연결 상태 : ${lolStatusState.lolStatus[0] ? lolStatusState.lolStatus[0].status : "알 수 없음"}`}>
                        <FaCircleNotch />
                    </NavStatusIcon>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus[1] ? lolStatusState.lolStatus[1].status : null}isFetching={lolStatusState.isFetching}
                    title={`상점 연결 상태 : ${lolStatusState.lolStatus[1] ? lolStatusState.lolStatus[1].status : "알 수 없음"}`}
                    counterSpin>
                        <FaCircleNotch />
                    </NavStatusIcon>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus[2] ? lolStatusState.lolStatus[2].status : null}isFetching={lolStatusState.isFetching}
                    title={`웹 연결 상태 : ${lolStatusState.lolStatus[2] ? lolStatusState.lolStatus[2].status : "알 수 없음"}`}>
                        <FaCircleNotch />
                    </NavStatusIcon>
                </NavbarGridItem>
                {
                    this.props.searchShow ? 
                    (
                        <NavbarItem>
                            <NavSearch
                                value={summonerState.summonerName}
                                onChange={summonerDispatch.typeSummoner}
                                onKeyPress={summonerDispatch.fetchSummoner}
                                placeholder={"닉네임 입력..."}>
                            </NavSearch>
                        </NavbarItem>
                    )
                    :
                    (
                        null
                    )
                }
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        summonerState : state.summoner,
        lolStatusState : state.lolStatus
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
        },

        lolStatusDispatch : {
            fetchLolStatus(){
                dispatch(lolStatusAction.fetchLolStatus());
            }
        }
    }
}

Navigation = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

export default Navigation;