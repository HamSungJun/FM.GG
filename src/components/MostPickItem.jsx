import React from 'react';
import {MdToys} from 'react-icons/md';
import * as mostPickAction from '../redux/actions/mostPickAction';
import {MP_Item, MP_Game_Gauge_Box, MP_Game_Gauge_Bar, MP_Game_Text, MP_Content_Box, MP_Control_Box, MP_Content_Champion , MP_Content_Info, MP_Content_Champion_Image, MP_Champion_Title, MP_Champion_Name, MP_Control_Button, MP_Control_State_Text} from '../styled/StyledComponents';
import {DATA_DRAGON_CHAMPION_SQUARE_IMAGE_URL} from '../redux/globals/global.js';
import {connect} from 'react-redux';

class MostPickItem extends React.Component{

    constructor(props){
        super(props);
    }

    renderAnalysisStateText(props){

        if(props.isAnalyzing === true){
            return {
                text : "Pending",
                color : "hsl(14, 73%, 62%)"
            }
        }

        if(props.analyzedData === null && props.isAnalyzing === false){
            return {
                text : "Ready",
                color : "rgb(189, 189, 189)"
            }
        } else if(props.analyzedData && props.isAnalyzing === false) {
            return {
                text : "Success",
                color : "hsl(122, 40%, 49%)"
            }
        }

    }

    render(){

        const playRate = ((this.props.pickData.playCount / 100) * 100).toFixed(2);
        const controlState = this.renderAnalysisStateText(this.props.pickData);
        console.log(this.props.pickData.key);

        return(

            <MP_Item>

                <MP_Game_Gauge_Box title={`최근 픽률 : ${playRate}%`} playRate={playRate}>
                    <MP_Game_Gauge_Bar></MP_Game_Gauge_Bar>
                    <MP_Game_Text>{this.props.pickData.playCount}%</MP_Game_Text>
                </MP_Game_Gauge_Box>
                <MP_Content_Box iconColor={controlState.color} isAnalyzing={this.props.pickData.isAnalyzing}>
                    <MP_Content_Champion align={"flex-start"}>
                        <MP_Content_Champion_Image src={DATA_DRAGON_CHAMPION_SQUARE_IMAGE_URL.concat(this.props.pickData.image.full)}></MP_Content_Champion_Image>
                    </MP_Content_Champion>
                    <MP_Content_Info direction={"column"} align={"flex-start"} justify={"space-around"}>
                        <MP_Champion_Name>
                            {this.props.pickData.name}
                        </MP_Champion_Name>
                        <MP_Champion_Title>
                            {this.props.pickData.title}
                        </MP_Champion_Title>
                    </MP_Content_Info>
                    <MdToys className={"workingIcon"} />
                </MP_Content_Box>
                <MP_Control_Box>
                    <MP_Control_Button>
                        <span onClick={()=>{this.props.requestInGameData(this.props.pickData.key)}}>
                            분석하기
                        </span> 
                    </MP_Control_Button>
                    <MP_Control_State_Text color={controlState.color}>" {controlState.text} "</MP_Control_State_Text>
                </MP_Control_Box>
                
            </MP_Item>

        )
    }

}

export default MostPickItem;