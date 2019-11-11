import React from 'react';
import {MdToys} from 'react-icons/md';
import * as mostPickAction from '../redux/actions/mostPickAction';
import {MP_Item, MP_Game_Gauge_Box, MP_Game_Gauge_Bar, MP_Game_Text, MP_Content_Box, MP_Control_Box, MP_Content_Champion , MP_Content_Info, MP_Content_Champion_Image, MP_Champion_Title, MP_Champion_Name, MP_Champion_Tags} from '../styled/StyledComponents';
import {DATA_DRAGON_CHAMPION_SQUARE_IMAGE_URL} from '../redux/globals/global.js'

class MostPickItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        const playRate = ((this.props.pickData.playCount / this.props.maxPlayCount) * 100).toFixed(2);

        return(
            <MP_Item>
                <MP_Game_Gauge_Box playRate={playRate}>
                    <MP_Game_Gauge_Bar></MP_Game_Gauge_Bar>
                    <MP_Game_Text>{this.props.pickData.playCount} / 100</MP_Game_Text>
                </MP_Game_Gauge_Box>
                <MP_Content_Box>
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
                <MP_Control_Box></MP_Control_Box>
                
            </MP_Item>
        )
    }

}

export default MostPickItem;