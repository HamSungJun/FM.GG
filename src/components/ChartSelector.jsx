import React from "react";
import {
  CS_Box,
  CS_Query_Filter,
  CS_Value_Selector,
  CS_Two_Column,
  CS_Query_Select,
  CS_Radio_Outer_Circle,
  CS_Radio_Inner_Circle,
  FlexBox,
  QC_DropDown,
  QC_DropDownListBox,
  QC_DropDownIconBox,
  QC_DropDownList,
  QC_DropDownSelected,
  CS_Radio_Grid,
  ColorText
} from "../styled/StyledComponents";
import {MdArrowDropDown} from 'react-icons/md';
import {connect} from 'react-redux';
import * as chartAction from '../redux/actions/chartAction.js';

class ChartSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      durationDropDownShow : false,
      laneDropDownShow : false,
    }
    this.dropDownListOpen = this.dropDownListOpen.bind(this);
  }

  dropDownListOpen(type){
        switch(type){
            case "duration" :
                return this.setState({
                    durationDropDownShow : !this.state.durationDropDownShow
                })
            case "lane" :
                return this.setState({
                    laneDropDownShow : !this.state.laneDropDownShow
                })
        }
  }

  renderDurationList(){

    const {mostPickState, chartState} = this.props;
    const gameData = mostPickState.mostPickInfo.find(pick => pick.key === mostPickState.analyzingKey).analyzedData;

    let durationMin = (900 / 60); // 15M to Second
    let durationMax = gameData[0]["gameDuration"];

    for(let index = 1; index < gameData.length; index++){
        if(durationMax < gameData[index]["gameDuration"]){
            durationMax = gameData[index]["gameDuration"];
        }
    }

    let durationItems = [];
    while(durationMin <= Math.ceil(durationMax/60)){
        durationItems.push(`${durationMin} ~ ${durationMin+10}`);
        durationMin = durationMin + 10;
    }
    
    return durationItems.map((durationItem, index) => {
      if(durationItem !== chartState.durationSelected){
        return (
          <QC_DropDownList onClick={()=>{
            this.props.dropDownListSelect("duration",durationItem)
            this.dropDownListOpen("duration");
          }} key={index}>{durationItem}</QC_DropDownList>
        )
      }
    })
    
  }

  renderLaneList(){

    const {mostPickState, chartState} = this.props;
    const gameData = mostPickState.mostPickInfo.find(pick => pick.key === mostPickState.analyzingKey).analyzedData;

    let playedLanes = [];
    gameData.forEach(game => {
        const playedLane = game.participants.find(participant => parseInt(participant.championId) === parseInt(mostPickState.analyzingKey)).timeline.lane;
        if(!playedLanes.includes(playedLane)){
            playedLanes.push(playedLane);
        }
    })

    return playedLanes.map((lane, index) => {
      if(lane !== chartState.laneSelected){
        return (
          <QC_DropDownList onClick={()=>{this.props.dropDownListSelect("lane",lane)
        this.dropDownListOpen("lane")}} key={index}>{lane}</QC_DropDownList>
        )
      }
    })

  }

  render() {
      const {mostPickState, chartState} = this.props;
    return (
        <CS_Box>
          {
              mostPickState.analyzingKey ?
              (
                <div>
                <CS_Query_Filter>
                <CS_Two_Column>
                  <QC_DropDown borderShow>
                    <QC_DropDownSelected color="rgb(9, 35, 51)" bgColor="white" onClick={()=>{this.dropDownListOpen("duration")}}>
                      {chartState.durationSelected}
                    </QC_DropDownSelected>
                    <QC_DropDownIconBox onClick={()=>{this.dropDownListOpen("duration")}}>
                      <MdArrowDropDown size={25} />
                    </QC_DropDownIconBox>
                    <QC_DropDownListBox show={this.state.durationDropDownShow}>
                      {this.renderDurationList()}
                    </QC_DropDownListBox>
                  </QC_DropDown>
                  <QC_DropDown borderShow>
                    <QC_DropDownSelected color="rgb(9, 35, 51)" bgColor="white" onClick={()=>{this.dropDownListOpen("lane")}}>
                      {chartState.laneSelected}
                    </QC_DropDownSelected>
                    <QC_DropDownIconBox onClick={()=>{this.dropDownListOpen("lane")}}>
                      <MdArrowDropDown size={25} />
                    </QC_DropDownIconBox>
                    <QC_DropDownListBox show={this.state.laneDropDownShow}>
                      {this.renderLaneList()}
                    </QC_DropDownListBox>
                  </QC_DropDown>
                </CS_Two_Column>
                <FlexBox align="center" justify="flex-start">
                  <CS_Radio_Grid>
                      <FlexBox>
                          <CS_Radio_Outer_Circle onClick={()=>{
                              this.props.radioValueChange("Stat")
                          }}>
                              <CS_Radio_Inner_Circle on={chartState.radioSelected === "Stat" ? true : false}></CS_Radio_Inner_Circle>
                          </CS_Radio_Outer_Circle>
                      </FlexBox>
                      <FlexBox>
                          Stats
                      </FlexBox>
                  </CS_Radio_Grid>
                  <CS_Radio_Grid>
                      <FlexBox>
                          <CS_Radio_Outer_Circle onClick={()=>{
                              this.props.radioValueChange("Timeline")
                          }}>
                              <CS_Radio_Inner_Circle on={chartState.radioSelected === "Timeline" ? true : false}></CS_Radio_Inner_Circle>
                          </CS_Radio_Outer_Circle>
                      </FlexBox>
                      <FlexBox>
                          Timeline
                      </FlexBox>
                  </CS_Radio_Grid>
                </FlexBox>
              </CS_Query_Filter>
              </div>
              )
              :
              (
                  <FlexBox>
                      <ColorText color="#ccc">
                        No analyzed champion selected.
                      </ColorText>
                  </FlexBox>
              )
              
          }
        </CS_Box>
    );
  }
}

const mapStateToProps = state => {
    return {
        mostPickState : state.mostPick,
        chartState : state.chart
    }
}

const mapDispatchToProps = dispatch => {
    return {
      radioValueChange(type){
        // Stat || Timeline
        return dispatch(chartAction.radioValueChange(type));
      },
      dropDownListSelect(type, value){
        switch(type){
          case "duration" :
            return dispatch(chartAction.durationValueChange(value));
          case "lane" :
            return dispatch(chartAction.laneValueChange(value));
          default :
            return;
        }
      }
    }
}



ChartSelector = connect(mapStateToProps, mapDispatchToProps)(ChartSelector);

export default ChartSelector;
