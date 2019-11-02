import React from 'react';
import {TiRefresh} from 'react-icons/ti'
import {QC_Box, QC_Types, QC_Refresh, QC_Type} from '../styled/StyledComponents'

class QueueChanger extends React.Component{
    constructor(props){
        super(props);
    }

    renderQcType(){

    }

    render(){
        return(
            <QC_Box>
                <QC_Types>
                    <QC_Refresh bg="hsl(203, 67%, 12%)">
                        <TiRefresh color={"white"} className="refreshIcon" />
                    </QC_Refresh>
                    <QC_Type>Solo</QC_Type>
                    <QC_Type>Flex</QC_Type>
                    <QC_Type>TFT</QC_Type>
                </QC_Types>

            </QC_Box>
        )
    }
}

export default QueueChanger;