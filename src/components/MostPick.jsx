import React from 'react';
import {connect} from 'react-redux';
import {BarLoader} from 'react-spinners'
import * as mostPickAction from '../redux/actions/mostPickAction';
import {MP_Box, FluidFlexBox} from '../styled/StyledComponents'
import MostPickItem from './MostPickItem.jsx';

class MostPick extends React.Component{

    constructor(props){
        super(props);
    }

    renderMostPickItems(){
        const {mostPickState} = this.props;
        if(mostPickState.mostPickInfo.length > 0){
            return mostPickState.mostPickInfo.map((pick) => {
                return <MostPickItem requestInGameData={this.props.requestInGameData} key={pick.key} pickData={pick} />
            })
        }
    }

    render(){

        const {mostPickState} = this.props;

        return(
            <MP_Box>
                {
                    mostPickState.isFetching ?
                    (
                       <FluidFlexBox>
                           <BarLoader />
                       </FluidFlexBox>
                    )
                    :
                    (
                        this.renderMostPickItems()
                    )
                }
            </MP_Box>
        )
    }

}

const mapStateToProps = state => {
    return {
        mostPickState : state.mostPick
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestInGameData(championId){
            dispatch(mostPickAction.fetchInGameData(championId))
        }
    }
}

MostPick = connect(mapStateToProps,mapDispatchToProps)(MostPick);

export default MostPick;