import React from 'react';
import {LeagueScoreBox, FlexCenteredBox} from '../styled/StyledComponents'
import {connect} from 'react-redux';

class LeagueScore extends React.Component{

    constructor(props){
        super(props);
        
    }

    renderRankImage(){
        const {leagueState} = this.props;
        if(leagueState.leagueData.length > 0){
            const targetLeagueInfo = leagueState.leagueData.find(leagueInfo => leagueInfo.queueType === leagueState.selectedQueueType);

            return(
                <FlexCenteredBox>
                    
                </FlexCenteredBox>
            )
        }
        
    }

    render(){
        
        return(
            <LeagueScoreBox>
                {this.renderRankImage()}
                <FlexCenteredBox>
                    2
                </FlexCenteredBox>
            </LeagueScoreBox>
        ) 
    }

}

const mapStateToProps = state => {
    return {
        league : state.league
    }
}

LeagueScore = connect(mapStateToProps, null)(LeagueScore);

export default LeagueScore;