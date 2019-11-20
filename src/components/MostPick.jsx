import React from 'react';
import {connect} from 'react-redux';
import {BarLoader} from 'react-spinners'
import * as mostPickAction from '../redux/actions/mostPickAction';
import {selectedPickChange} from '../redux/actions/chartAction';
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
                return <MostPickItem 
                    requestInGameData={this.props.requestInGameData}
                    selectPickHandler={this.checkMostPickAnalyzed.bind(this)}
                    key={pick.key} 
                    pickData={pick} 
                    shadow={mostPickState.analyzingKey === pick.key}
                    />
            })
        }
    }

    checkMostPickAnalyzed(key){

        const {mostPickState, selectMostPick} = this.props;

        if(key === mostPickState.analyzingKey){
            return this.props.releasePickSelection();
        }

        const targetPick = mostPickState.mostPickInfo.find(pick => pick.key === key);
        if(targetPick.analyzedData && targetPick.analyzedData.length > 0){
            return selectMostPick(key);
        } else {
            return alert("해당 모스트 픽에 대한 분석을 먼저 진행해 주세요.");
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
        requestInGameData(event, championId){
            event.stopPropagation();
            dispatch(mostPickAction.fetchInGameData(championId))
        },

        selectMostPick(key){
            dispatch(mostPickAction.mostPickItemSelected(key));
            dispatch(selectedPickChange());
        },

        releasePickSelection(){
            dispatch(mostPickAction.mostPickItemReleased());
        }
    }
}

MostPick = connect(mapStateToProps,mapDispatchToProps)(MostPick);

export default MostPick;