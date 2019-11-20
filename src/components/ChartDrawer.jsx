import React from "react";
import { connect } from "react-redux";
import {
  CD_Wrapper,
  CD_Chart_List,
  CD_Chart_Container,
  FlexBox,
  ColorText,
  CD_Absolute_Hover,
  CD_Visualize_Button,
  QC_DropDown,
  QC_DropDownListBox,
  QC_DropDownIconBox,
  QC_DropDownList,
  QC_DropDownSelected
} from "../styled/StyledComponents";
import { MdArrowDropDown } from "react-icons/md";
import {selectedGameKeyChange} from "../redux/actions/chartAction.js";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class ChartDrawer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameKeyDropDownShow : false,
    }
    this.toggleDropDownShow = this.toggleDropDownShow.bind(this);
    this.drawChartByGameKey = this.drawChartByGameKey.bind(this);
    this.getTargetPickData = this.getTargetPickData.bind(this);
    this.disposeChartIfExist = this.disposeChartIfExist.bind(this);
  }

  shouldComponentUpdate(nextProps){

    if(this.props.mostPickState.analyzingKey !== nextProps.mostPickState.analyzingKey){
      this.disposeChartIfExist();
    }

    return true;
  }

  componentWillUnmount(){
    this.disposeChartIfExist();
  }
  
  disposeChartIfExist(){
    if(this.chart){
      return this.chart.dispose();
    }
  }

  drawChartByGameKey() {
    const {mostPickState, chartState} = this.props;
    if([chartState.durationSelected,chartState.laneSelected,chartState.gameKeySelected].some(selectState => selectState === null)){
      return alert("게임 시간, 플레이 라인, 게임 키는 반드시 선택되어야 합니다.");
    }
    
    this.disposeChartIfExist();

    const targetPickData = this.getTargetPickData();
    switch(chartState.gameKeySelected){
      case "KDA" :
        this.createKDAChart(
          targetPickData,
          chartState.durationSelected,
          chartState.laneSelected,
          mostPickState.analyzingKey,
          chartState.radioSelected,
          ["kills","assists","deaths"]
          )
      break;
    }

  }

  createKDAChart(originData, duration, lane, championKey, radioKey, gameKey){

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    const durationRange = duration.split(" ~ ").map(min => parseInt(min) * 60);
    const refinedData = this.refineOriginData(originData, durationRange, lane, championKey);
   
    chart.data = refinedData.map((gameData, index) => {

      let dataPoint = {}
      dataPoint["gameIndex"] = index+1;
      dataPoint["gameCreation"] = gameData.gameCreation;
      dataPoint["gameDuration"] = gameData.gameDuration;

      gameKey.forEach(key => {
        dataPoint[key] = gameData.participant[radioKey][key]
      })

      return dataPoint;

    })

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "gameIndex";
    categoryAxis.title.text = "Game Indexes";
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Points";

    let assistSeries = chart.series.push(new am4charts.LineSeries());
    assistSeries.name = "Assist";
    assistSeries.tooltipText = "Assist : {valueY}"
    assistSeries.stroke = am4core.color("#42A5F5");
    assistSeries.strokeWidth = 2;
    assistSeries.dataFields.valueY = "assists";
    assistSeries.dataFields.categoryX = "gameIndex";

    let deathSeries = chart.series.push(new am4charts.LineSeries());
    deathSeries.name = "Death";
    deathSeries.tooltipText = "Death : {valueY}"
    deathSeries.stroke = am4core.color("#E57373");
    deathSeries.strokeWidth = 2;
    deathSeries.dataFields.valueY = "deaths";
    deathSeries.dataFields.categoryX = "gameIndex";

    let killSeries = chart.series.push(new am4charts.LineSeries());
    killSeries.name = "Kill";
    killSeries.tooltipText = "Kill : {valueY}"
    killSeries.stroke = am4core.color("#81C784");
    killSeries.strokeWidth = 2;
    killSeries.dataFields.valueY = "kills";
    killSeries.dataFields.categoryX = "gameIndex";

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
}

  refineOriginData(originData, durationRange, lane, championKey){

    return originData.reduce((acc,curr) => {
      if(durationRange[0] <= curr.gameDuration && curr.gameDuration  <= durationRange[1]){
        const participant = curr.participants.find(participant => parseInt(participant.championId) === parseInt(championKey));
        if(lane === participant.timeline.lane){
          acc.unshift({
            gameCreation : curr.gameCreation,
            gameDuration : curr.gameDuration,
            participant
          })
      }
      }
      return acc;
    },[])

  }

  getTargetPickData() {
    const {mostPickState} = this.props;
    return mostPickState.mostPickInfo.find(pick => parseInt(pick.key) === parseInt(mostPickState.analyzingKey)).analyzedData;
  }

  renderGameKeys(type) {

    const {chartState} = this.props;

    const statKeys = ["KDA", "goldEarned", "totalDamageDealtToChampions", "totalDamageTaken", "totalMinionsKilled", "visionScore", "visionWardsBoughtInGame", "wardsKilled", "wardsPlaced"];

    const timelineKeys = ["creepsPerMinDeltas", "damageTakenPerMinDeltas", "goldPerMinDeltas", "xpPerMinDeltas"];

    let targetKeys = type === "stats" ? statKeys : timelineKeys;

    return targetKeys.map((gameKey, index) => {
      if(gameKey !== chartState.gameKeySelected){
        return <QC_DropDownList onClick={()=>{
          this.props.gameKeyChange(gameKey);
          this.toggleDropDownShow();
        }} key={index}>{gameKey}</QC_DropDownList>;
      }
    });

  }
  toggleDropDownShow(){
    this.setState({
      gameKeyDropDownShow : !this.state.gameKeyDropDownShow
    })
  }
  render() {
    const { mostPickState, chartState } = this.props;
    return (
      <CD_Wrapper>
        {mostPickState.analyzingKey ? (
          <React.Fragment>
            <CD_Chart_List>
              <QC_DropDown borderShow>
                <QC_DropDownSelected onClick={this.toggleDropDownShow} color="rgb(9, 35, 51)" bgColor="white">
                  {chartState.gameKeySelected || "key"}
                </QC_DropDownSelected>
                <QC_DropDownIconBox onClick={this.toggleDropDownShow}>
                  <MdArrowDropDown size={25} />
                </QC_DropDownIconBox>
                <QC_DropDownListBox show={this.state.gameKeyDropDownShow}>{this.renderGameKeys(chartState.radioSelected)}</QC_DropDownListBox>
              </QC_DropDown>
              <CD_Visualize_Button onClick={this.drawChartByGameKey}>Render</CD_Visualize_Button>
            </CD_Chart_List>
            <CD_Chart_Container>
              <div style={{width : "100%", height : "100%"}} id="chartdiv"></div>
            </CD_Chart_Container>
          </React.Fragment>
        ) : (
          <CD_Absolute_Hover>
            <FlexBox height="100%">
              <ColorText color="#ccc">No analyzed champion selected.</ColorText>
            </FlexBox>
          </CD_Absolute_Hover>
        )}
      </CD_Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    mostPickState: state.mostPick,
    chartState: state.chart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameKeyChange(gameKey){
      dispatch(selectedGameKeyChange(gameKey))
    }
  }
}

ChartDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartDrawer);

export default ChartDrawer;
