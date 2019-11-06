import React from 'react';
import {TiRefresh} from 'react-icons/ti';
import {MdArrowDropDown} from 'react-icons/md';
import {QC_Box, QC_Types, QC_Refresh, QC_DropDown, QC_DropDownIconBox, QC_DropDownListBox, QC_DropDownList, QC_DropDownSelected, FluidFlexBox} from '../styled/StyledComponents';
import {connect} from 'react-redux';
import * as leagueAction from '../redux/actions/leagueAction';
import LeagueScore from './LeagueScore.jsx';
import {BarLoader} from 'react-spinners'

class QueueChanger extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            dropDownShow : false
        }

        this.dropDownListOpen = this.dropDownListOpen.bind(this);
        
    }

    renderQcTypeDropDown(){

        const {leagueState, leagueDispatch} = this.props;
        const QUEUE_TYPES = [
            "RANKED_SOLO_5x5",
            "RANKED_FLEX_SR",
            "RANKED_FLEX_TT",
            "RANKED_TFT"
        ]

        return (

            <QC_DropDown>
                <QC_DropDownSelected onClick={this.dropDownListOpen}>
                    {leagueState.selectedQueueType || "Games Not Played."}
                </QC_DropDownSelected>
                <QC_DropDownIconBox onClick={this.dropDownListOpen}>
                    <MdArrowDropDown size={25} />
                </QC_DropDownIconBox>
                <QC_DropDownListBox show={this.state.dropDownShow}>
                    {leagueState.leagueData.filter(leagueInfo => leagueInfo.queueType !== leagueState.selectedQueueType).map((leagueInfo, index) => (
                        <QC_DropDownList onClick={()=>{
                            leagueDispatch.queueTypeChange(leagueInfo.queueType);
                            return this.setState({
                                dropDownShow : !this.state.dropDownShow
                            })
                        }} key={index}>
                            {leagueInfo.queueType}
                        </QC_DropDownList>
                    ))}
                </QC_DropDownListBox>
            </QC_DropDown>
            
        )

    }

    dropDownListOpen(){
        return this.setState({
            dropDownShow : !this.state.dropDownShow
        })
    }


    render(){
        const {summonerState, leagueState, leagueDispatch} = this.props;
        return(
            <QC_Box>
                {
                    leagueState.isFetching ? 
                    (
                        <FluidFlexBox>
                            <BarLoader />
                        </FluidFlexBox>
                    )
                    :
                    (
                    <div>
                        <QC_Types>
                            <QC_Refresh bg="hsl(203, 67%, 12%)">
                                <TiRefresh color={"white"} className="refreshIcon" />
                            </QC_Refresh>
                            {this.renderQcTypeDropDown()}
                        </QC_Types>
                        <LeagueScore />
                    </div>
                    )
                }
                
            </QC_Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        summonerState : state.summoner,
        leagueState : state.league
    }
}

const mapDispatchToProps = dispatch => {
    return {
        leagueDispatch : {
            queueTypeChange(queueType){
                dispatch(leagueAction.queueTypeChange(queueType));
            }
        }
    }
}

QueueChanger = connect(mapStateToProps, mapDispatchToProps)(QueueChanger);

export default QueueChanger;