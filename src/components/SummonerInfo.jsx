import React from 'react';
import Navigation from './Navigation.jsx';
import {Box, SI_Layer_1, SI_Layer_2__Left, SI_Layer_2__Right} from '../styled/StyledComponents';
import QueueChanger from './QueueChanger.jsx';
import MostPick from './MostPick.jsx';
import {connect} from 'react-redux';
import {fetchSummoner} from '../redux/actions/summonerAction';

class SummonerInfo extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

        const {summonerState, summonerDispatch} = this.props;
        if(summonerState.summonerName === ""){
            return summonerDispatch.fetchSummoner();
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
            fetchSummoner(){
                dispatch(fetchSummoner());
            }
        }
    }
}

SummonerInfo = connect(mapStateToProps, mapDispatchToProps)(SummonerInfo);

export default SummonerInfo;