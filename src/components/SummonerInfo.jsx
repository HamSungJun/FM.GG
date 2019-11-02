import React from 'react';
import Navigation from './Navigation.jsx';
import {Box, SI_Layer_1, SI_Layer_2__Left, SI_Layer_2__Right} from '../styled/StyledComponents';
import QueueChanger from './QueueChanger.jsx';


class SummonerInfo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Box>
                <Navigation searchShow={true} />
                <SI_Layer_1>
                    <SI_Layer_2__Left>
                        <QueueChanger />
                    </SI_Layer_2__Left>
                    <SI_Layer_2__Right>

                    </SI_Layer_2__Right>
                </SI_Layer_1>
            </Box>
        )
    }
}

export default SummonerInfo;