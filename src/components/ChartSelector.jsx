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

class ChartSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        durationDropDownShow : false,
        laneDropDownShow : false,
        durationSelected : "Duration",
        laneSelected : "Lane",
        statRadio : true,
        timelineRadio : false,
    }

    this.dropDownListOpen = this.dropDownListOpen.bind(this);
    this.handleDropDownListSelect = this.handleDropDownListSelect.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);

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

  handleRadioClick(type){
        switch(type){
            case "stat" :
                return this.setState({
                    statRadio : true,
                    timelineRadio : false
                })
            case "timeline" :
                return this.setState({
                    statRadio : false,
                    timelineRadio : true
                })
        }
  }

  handleDropDownListSelect(type, value){

    switch(type){
      case "duration" :
        return this.setState({
          durationSelected : value
        })
      case "lane" :
        return this.setState({
          laneSelected : value
        })
    }

  }

  renderDurationList(){

    const {mostPickState} = this.props;
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
      if(durationItem !== this.state.durationSelected){
        return (
          <QC_DropDownList onClick={()=>{this.handleDropDownListSelect("duration",durationItem)}} key={index}>{durationItem}</QC_DropDownList>
        )
      }
    })
    
  }

  renderLaneList(){

    const {mostPickState} = this.props;
    const gameData = mostPickState.mostPickInfo.find(pick => pick.key === mostPickState.analyzingKey).analyzedData;

    let playedLanes = [];
    gameData.forEach(game => {
        const playedLane = game.participants.find(participant => parseInt(participant.championId) === parseInt(mostPickState.analyzingKey)).timeline.lane;
        if(!playedLanes.includes(playedLane)){
            playedLanes.push(playedLane);
        }
    })

    return playedLanes.map((lane, index) => {
      if(lane !== this.state.laneSelected){
        return (
          <QC_DropDownList onClick={()=>{this.handleDropDownListSelect("lane",lane)}} key={index}>{lane}</QC_DropDownList>
        )
      }
    })

  }

  render() {
      const {mostPickState} = this.props;
    return (
        <CS_Box>
          {
              mostPickState.analyzingKey ?
              (
                <div>
                <CS_Query_Filter>
                <CS_Two_Column>
                  <QC_DropDown borderShow>
                    <QC_DropDownSelected color="hsl(221, 76%, 62%)" bgColor="white" onClick={()=>{this.dropDownListOpen("duration")}}>
                      {this.state.durationSelected}
                    </QC_DropDownSelected>
                    <QC_DropDownIconBox onClick={()=>{this.dropDownListOpen("duration")}}>
                      <MdArrowDropDown size={25} />
                    </QC_DropDownIconBox>
                    <QC_DropDownListBox show={this.state.durationDropDownShow}>
                      {this.renderDurationList()}
                    </QC_DropDownListBox>
                  </QC_DropDown>
                  <QC_DropDown borderShow>
                    <QC_DropDownSelected color="hsl(221, 76%, 62%)" bgColor="white" onClick={()=>{this.dropDownListOpen("lane")}}>
                      {this.state.laneSelected}
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
                              this.handleRadioClick("stat")
                          }}>
                              <CS_Radio_Inner_Circle on={this.state.statRadio}></CS_Radio_Inner_Circle>
                          </CS_Radio_Outer_Circle>
                      </FlexBox>
                      <FlexBox>
                          Stats
                      </FlexBox>
                  </CS_Radio_Grid>
                  <CS_Radio_Grid>
                      <FlexBox>
                          <CS_Radio_Outer_Circle onClick={()=>{
                              this.handleRadioClick("timeline")
                          }}>
                              <CS_Radio_Inner_Circle on={this.state.timelineRadio}></CS_Radio_Inner_Circle>
                          </CS_Radio_Outer_Circle>
                      </FlexBox>
                      <FlexBox>
                          Timeline
                      </FlexBox>
                  </CS_Radio_Grid>
                </FlexBox>
              </CS_Query_Filter>
              <CS_Value_Selector>

              </CS_Value_Selector>
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
        mostPickState : state.mostPick
    }
}

ChartSelector = connect(mapStateToProps, null)(ChartSelector);

export default ChartSelector;
