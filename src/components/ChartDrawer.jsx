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

class ChartDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameKeyDropDownShow : false
    }
    this.toggleDropDownShow = this.toggleDropDownShow.bind(this);
  }
  renderGameKeys(type) {
    const statKeys = ["1", "2", "3"];

    const timelineKeys = ["a", "b", "c"];

    let targetKeys = type === "Stat" ? statKeys : timelineKeys;

    return targetKeys.map((gameKey, index) => {
      return <QC_DropDownList onClick={this.toggleDropDownShow} key={index}>{gameKey}</QC_DropDownList>;
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
                  {"key"}
                </QC_DropDownSelected>
                <QC_DropDownIconBox onClick={this.toggleDropDownShow}>
                  <MdArrowDropDown size={25} />
                </QC_DropDownIconBox>
                <QC_DropDownListBox show={this.state.gameKeyDropDownShow}>{this.renderGameKeys(chartState.radioSelected)}</QC_DropDownListBox>
              </QC_DropDown>
              <CD_Visualize_Button>Render</CD_Visualize_Button>
            </CD_Chart_List>
            <CD_Chart_Container></CD_Chart_Container>
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

ChartDrawer = connect(
  mapStateToProps,
  null
)(ChartDrawer);

export default ChartDrawer;
