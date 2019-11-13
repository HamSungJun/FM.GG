import React from 'react';
import {LeagueScoreBox, FlexBox, LeagueImage, PaddedFlexBox, PaddedFlexBox_No_Pr, BadgeContainer, BadgeTag, BadgeValue, PaddedGridBox, GaugedNameBar, GaugeBar, GaugeBarItem, Gauge, NameBar} from '../styled/StyledComponents'
import {connect} from 'react-redux';

class LeagueScore extends React.Component{

    renderRankImage(){
        const {leagueState} = this.props;
        if(leagueState.leagueData.length > 0){
            const targetLeagueInfo = leagueState.leagueData.find(leagueInfo => leagueInfo.queueType === leagueState.selectedQueueType);

            let winRate = this.getRate(
                (targetLeagueInfo.wins+targetLeagueInfo.losses),(targetLeagueInfo.wins)
                )

            let looseRate = this.getRate(
                (targetLeagueInfo.wins+targetLeagueInfo.losses),(targetLeagueInfo.losses)
                )
            return(
                <div>
                    <LeagueScoreBox>
                        <PaddedFlexBox_No_Pr value={20}>
                            <LeagueImage src={this.getRankImagePath(targetLeagueInfo.tier)} ></LeagueImage>
                        </PaddedFlexBox_No_Pr>
                        <PaddedFlexBox>
                            <PaddedGridBox value={20} rowGap={3} >
                                <BadgeContainer>
                                    <BadgeTag>Rank</BadgeTag>
                                    <BadgeValue color={this.getRankColor(targetLeagueInfo.tier)}>{targetLeagueInfo.tier}</BadgeValue>
                                </BadgeContainer>
                                <BadgeContainer>
                                    <BadgeTag>Tier</BadgeTag>
                                    <BadgeValue>{targetLeagueInfo.rank}</BadgeValue>
                                </BadgeContainer>
                                <BadgeContainer>
                                    <BadgeTag>LP</BadgeTag>
                                    <BadgeValue>{targetLeagueInfo.leaguePoints}</BadgeValue>
                                </BadgeContainer>
                            </PaddedGridBox>
                        </PaddedFlexBox>
                    </LeagueScoreBox>
                    <GaugedNameBar>
                        <GaugeBar
                        title={`승률 : ${winRate}%`}
                        winRate={winRate}
                        looseRate={looseRate}
                        >
                            <GaugeBarItem>
                                <Gauge 
                                    key={winRate}
                                    color={"hsl(195, 74%, 39%)"}
                                    pos={"left"}
                                    rate={winRate}
                                ></Gauge>
                            </GaugeBarItem>

                            <GaugeBarItem>
                                <Gauge
                                    key={looseRate}
                                    color={"hsl(14, 67%, 61%)"}
                                    pos={"right"}
                                    rate={looseRate}
                                ></Gauge>
                            </GaugeBarItem>

                        </GaugeBar>
                        <NameBar value={5}>
                            <span>{targetLeagueInfo.summonerName}</span>
                        </NameBar>
                    </GaugedNameBar>
                </div>
            )
        } else {
            return <LeagueScoreBox></LeagueScoreBox>
        }
    }

    getRankImagePath(tier){
        return require(`../../assets/rankImages/RANK_${tier}.png`);
    }

    getRate(sum,partition){
        return ((partition/sum)*100).toFixed(2);
    }

    getRankColor(rank){

        switch(rank){
            case "IRON" :
                return "hsl(0, 8%, 34%)";
            case "BRONZE" :
                return "hsl(14, 46%, 36%)";
            case "SILVER" :
                return "hsl(210, 9%, 41%)";
            case "GOLD" : 
                return "hsl(42, 65%, 45%)";
            case "PLATINUM" :
                return "hsl(167, 40%, 57%)";
            case "DIAMOND" :
                return "hsl(254, 62%, 65%)";
            case "MASTER" :
                return "hsl(299, 92%, 63%)";
            case "GRANDMASTER" :
                return "hsl(357, 76%, 37%)";
            case "CHALLENGER" :
                return "hsl(226, 73%, 67%)";
        }

    }

    render(){
        
        return this.renderRankImage();

    }

}

const mapStateToProps = state => {
    return {
        leagueState : state.league
    }
}

LeagueScore = connect(mapStateToProps, null)(LeagueScore);

export default LeagueScore;