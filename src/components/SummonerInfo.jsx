import React from 'react';
import Navigation from './Navigation.jsx';
import {Box, SI_Layer_1, SI_Layer_2__Left, SI_Layer_2__Right} from '../styled/StyledComponents';
import QueueChanger from './QueueChanger.jsx';
import MostPick from './MostPick.jsx';
import {connect} from 'react-redux';
import {fetchSummoner} from '../redux/actions/summonerAction';
import ChartDrawer from './ChartDrawer.jsx';
import ChartSelector from './ChartSelector.jsx';
import {withRouter} from 'react-router-dom'

class SummonerInfo extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(!this.props.location.search){
            alert("먼저 소환사 이름을 입력해주세요.");
            return this.props.history.replace('/');
        }
    }

    componentDidMount(){
        const {summonerDispatch} = this.props;
        summonerDispatch.fetchSummoner(this.props.location.search.substr(1).split("=")[1]);
    }

    componentDidUpdate(prevProps){
        if(this.props.location.search !== prevProps.location.search){
            const {summonerDispatch} = this.props;
            summonerDispatch.fetchSummoner(this.props.location.search.substr(1).split("=")[1]);
        }
    }

    render(){
        return(
            <Box>
                <Navigation searchShow={true} />
                <SI_Layer_1>
                    <SI_Layer_2__Left>
                        <QueueChanger />
                        <MostPick />
                    </SI_Layer_2__Left>
                    <SI_Layer_2__Right>
                        <ChartSelector />
                        <ChartDrawer />
                    </SI_Layer_2__Right>
                </SI_Layer_1>
            </Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        summonerState : state.summoner
    }
}

const mapDispatchToProps = dispatch => {
    return {
        summonerDispatch : {
            fetchSummoner(summonerName){
                dispatch(fetchSummoner(summonerName));
            }
        }
    }
}

SummonerInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(SummonerInfo));

export default SummonerInfo;