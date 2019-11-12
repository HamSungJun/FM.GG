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
        if(mostPickState.mostPick.length > 0){
            const maxPlayCount = mostPickState.mostPick[0].playCount;
            return mostPickState.mostPick.map((pick) => {
                return <MostPickItem key={pick.key} maxPlayCount={maxPlayCount} pickData={pick} />
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

    }
}

MostPick = connect(mapStateToProps,null)(MostPick);

export default MostPick;