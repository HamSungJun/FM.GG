import React from 'react';
import {HomeLogo, NavLogo, ColorText} from '../styled/StyledComponents'

const TITLE_THEME = [
    "#99B898",
    "#FECEA8",
    "#FF847C",
    "#E84A5F",
    "#2A363B"
];

class Logo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            colorMoverId : null,
            title_theme : []
        }

        this.renderColorText = this.renderColorText.bind(this);
        this.startTitleColoring = this.startTitleColoring.bind(this);

    }

    componentDidMount(){

       return this.setState({
           colorMoverId : setInterval(this.startTitleColoring,500)
       })

    }

    componentWillUnmount(){

        return clearInterval(this.state.colorMoverId);

    }

    startTitleColoring(){

        let prevTitleTheme = this.state.title_theme;
        
        if(prevTitleTheme.length < 5){
            prevTitleTheme.push(TITLE_THEME[prevTitleTheme.length]);
        } else {
            prevTitleTheme.unshift(prevTitleTheme.pop());
        }

        return this.setState({
            title_theme : prevTitleTheme
        })
        
    }

    renderLogo(){
        const {logoType} = this.props;
        switch(logoType){
            case "Home" :
                return(
                    <HomeLogo>
                        {this.renderColorText()}
                    </HomeLogo>
                )
            case "Nav" :
                return(
                    <NavLogo>
                        {this.renderColorText("none")}
                    </NavLogo>
                )
        }
    }

    renderColorText(hideDot){
        return (
            <div>
                <ColorText color={this.state.title_theme[0]}>F</ColorText>
                <ColorText color={this.state.title_theme[1]}>M</ColorText>
                <ColorText show={hideDot} color={this.state.title_theme[2]}>.</ColorText>
                <ColorText color={this.state.title_theme[3]}>G</ColorText>
                <ColorText color={this.state.title_theme[4]}>G</ColorText>
            </div>
        )
    }

    render(){
        return this.renderLogo();
    }

}

export default Logo;