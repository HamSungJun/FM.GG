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
            statusFetcherId : setInterval(this.props.lolStatusDispatch.fetchLolStatus,5*60*1000)
        });
    }

    componentWillUnmount(){
        return clearInterval(this.state.statusFetcherId);
    }

    handleRouteToHome(){
        return this.props.history.push('/');
    }

    renderLolStatusIcon(){
        const {lolStatusState} = this.props
        return (
            <NavbarGridItem>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[0].status : null}isFetching={lolStatusState.isFetching}
                    title={`게임 연결 상태 : ${lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[0].status : "알 수 없음"}`}>
                        <FaCircleNotch />
                    </NavStatusIcon>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[1].status : null}isFetching={lolStatusState.isFetching}
                    title={`상점 연결 상태 : ${lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[1].status : "알 수 없음"}`}
                    counterSpin>
                        <FaCircleNotch />
                    </NavStatusIcon>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[2].status : null}isFetching={lolStatusState.isFetching}
                    title={`웹 연결 상태 : ${lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[2].status : "알 수 없음"}`}>
                        <FaCircleNotch />
                    </NavStatusIcon>
                    <NavStatusIcon 
                    status={lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[3].status : null}isFetching={lolStatusState.isFetching}
                    title={`클라이언트 연결 상태 : ${lolStatusState.lolStatus.services ? lolStatusState.lolStatus.services[3].status : "알 수 없음"}`} counterSpin>
                        <FaCircleNotch />
                    </NavStatusIcon>
            </NavbarGridItem>
        )
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
                {this.renderLolStatusIcon()}
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