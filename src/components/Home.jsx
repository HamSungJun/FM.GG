import React from 'react';
import {connect} from 'react-redux'
import {Box, Title, SubTitle, InputBox, TextInput, ArrowBox, ColorText, Container} from '../styled/StyledHome.js'
import {MdArrowDropDown} from 'react-icons/md'
import * as summonerAction from '../redux/actions/summonerAction'

const TITLE_THEME = [
    "#99B898",
    "#FECEA8",
    "#FF847C",
    "#E84A5F",
    "#2A363B"
];

class Home extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            title_theme : [],
            title_color_direction : 'add'
        }

        this.startTitleColoring = this.startTitleColoring.bind(this);
       
    }

    componentDidMount(){

        setInterval(this.startTitleColoring,500);

    }

    startTitleColoring(){

        let prevTitleTheme = this.state.title_theme;
        
        if(this.state.title_color_direction === "add" && prevTitleTheme.length < 5){
            prevTitleTheme.push(TITLE_THEME[prevTitleTheme.length]);
        } else {
            prevTitleTheme.unshift(prevTitleTheme.pop());
        }

        return this.setState({
            title_theme : prevTitleTheme
        })
        
    }

    render(){
        const {summonerState, summonerDispatch} = this.props
        return(
            <Box>
                <Container>
                    <Title color={"white"}>
                        <ColorText color={this.state.title_theme[0]}>F</ColorText>
                        <ColorText color={this.state.title_theme[1]}>M</ColorText>
                        <ColorText color={this.state.title_theme[2]}>.</ColorText>
                        <ColorText color={this.state.title_theme[3]}>G</ColorText>
                        <ColorText color={this.state.title_theme[4]}>G</ColorText>
                    </Title>
                    <SubTitle color={"white"}>15분에 서렌합시다.</SubTitle>
                    <InputBox>
                        <TextInput
                        value={summonerState.summonerName}
                        onChange={summonerDispatch.typeSummoner}
                        onKeyPress={summonerDispatch.fetchSummoner}
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
            fetchSummoner(event){
                const keyCode = event.which || event.keyCode;
                if(keyCode === 13){
                    dispatch(summonerAction.fetchSummoner());
                }
            }
        }
        
    }

}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;