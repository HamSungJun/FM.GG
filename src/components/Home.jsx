import React from 'react';
import Logo from './Logo.jsx'
import Navigation from './Navigation.jsx'
import {connect} from 'react-redux'
import {Box, SubTitle, InputBox, TextInput, ArrowBox, Container} from '../styled/StyledComponents'
import {MdArrowDropDown} from 'react-icons/md'
import * as summonerAction from '../redux/actions/summonerAction'
import {withRouter} from 'react-router-dom';

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    handleRouteToSummonerInfo(){
        const {summonerState, summonerDispatch} = this.props;
        this.props.history.push(`/summonerInfo?name=${summonerState.summonerName}`);
    }

    render(){
        const {summonerState, summonerDispatch} = this.props
        return(
            <Box>
                <Navigation searchShow={false} />
                <Container>
                    <Logo logoType={"Home"} color={"white"} />
                    <SubTitle color={"white"}>15분에 서렌합시다.</SubTitle>
                    <InputBox>
                        <TextInput
                        value={summonerState.summonerName}
                        onChange={summonerDispatch.typeSummoner}
                        onKeyPress={(event)=>{
                            const keyCode = event.which || event.keyCode;
                            if(keyCode === 13){
                                this.handleRouteToSummonerInfo();
                            }
                        }}
                        type={"text"} 
                        placeholder={"정지 먹을 닉네임"}
                        ></TextInput>
                        <ArrowBox>
                            <MdArrowDropDown size={30}/>
                        </ArrowBox>
                    </InputBox>
                </Container>
            </Box>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        summonerState : state.summoner
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
        summonerDispatch : {
            typeSummoner(event){
                dispatch(summonerAction.typeSummoner(event.target.value))
            },
        }
    }

}

Home = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

export default Home;