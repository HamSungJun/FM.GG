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
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

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
      case "Gold Earned" :
          this.createGoldChart(
            targetPickData,
            chartState.durationSelected,
            chartState.laneSelected,
            mostPickState.analyzingKey,
            chartState.radioSelected,
            ["goldEarned"]
          )
      break;
      case "Total Damage Dealt,Taken To Champions" :
          this.createDamageChart(
            targetPickData,
            chartState.durationSelected,
            chartState.laneSelected,
            mostPickState.analyzingKey,
            chartState.radioSelected,
            ["totalDamageDealtToChampions","totalDamageTaken"]
          )
      break;
    }

  }

  createDamageChart(originData, duration, lane, championKey, radioKey, gameKey){
    
    am4core.unuseTheme(am4themes_kelly);
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
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

    console.log(chart.data);

    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "gameIndex";
    categoryAxis.title.text = "Game Indexes";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY}";
    series1.name = "Damage Dealt";
    series1.dataFields.categoryX = "gameIndex";
    series1.dataFields.valueY = "totalDamageDealtToChampions";
    series1.dataFields.valueYShow = "totalPercent";
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY}";
    series2.name = "Damage Taken";
    series2.dataFields.categoryX = "gameIndex";
    series2.dataFields.valueY = "totalDamageTaken";
    series2.dataFields.valueYShow = "totalPercent";
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    chart.scrollbarX = new am4core.Scrollbar();
    return this.chart = chart;

  }

  createGoldChart(originData, duration, lane, championKey, radioKey, gameKey){

    am4core.useTheme(am4themes_kelly);
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    const durationRange = duration.split(" ~ ").map(min => parseInt(min) * 60);
    const refinedData = this.refineOriginData(originData, durationRange, lane, championKey);
   
    chart.data = refinedData.map((gameData, index) => {

      let dataPoint = {}
      dataPoint["gameIndex"] = index+1;
      dataPoint["gameCreation"] = gameData.gameCreation;
      dataPoint["gameDuration"] = `${parseInt(gameData.gameDuration/60)}분 ${gameData.gameDuration%60}초`;

      gameKey.forEach(key => {
        dataPoint[key] = gameData.participant[radioKey][key]
      })

      return dataPoint;

    })

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "gameIndex";
    categoryAxis.title.text = "Game Indexes";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Gold Earned";

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = gameKey;
    series.dataFields.categoryX = "gameIndex";
    series.name = "Gold Earned";
    series.columns.template.tooltipText = `[bold]골드 획득 : {valueY}[/]
    [bold]플레이 시간: {gameDuration}`;
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    return this.chart = chart;
  }

  createKDAChart(originData, duration, lane, championKey, radioKey, gameKey){

    am4core.unuseTheme(am4themes_kelly);
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

    return this.chart = chart;
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

    const statKeys = ["KDA", "Gold Earned", "Total Damage Dealt,Taken To Champions", "totalMinionsKilled", "visionScore", "visionWardsBoughtInGame", "wardsKilled", "wardsPlaced"];

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
