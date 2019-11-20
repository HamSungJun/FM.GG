import Styled, { keyframes, css } from "styled-components";
import {device} from './device.js';


export const FlexCenteredBox = Styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
`

export const FlexBox = Styled.div`
    display: flex;
    flex-direction: ${props => props.direction || "row"};
    align-items: ${props => props.align || "center"};
    justify-content : ${props => props.justify || "center"};
    height : ${props => props.height || "auto"};
`

export const FluidFlexBox = Styled(FlexBox)`
    height: 100%;
    width: 100%;
`

export const Box = Styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: hsl(221, 76%, 62%);
`;

export const Container = Styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding-top: 80px;
`;

export const Logo = Styled.h1`
    text-align : center;
    -webkit-text-stroke: 2px #000;
    // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color : ${props => props.color || "black"};
    box-sizing: content-box;
`;

export const HomeLogo = Styled(Logo)`
    font-size: 9vw;
    letter-spacing: 0.7vw;
    @media ${device.laptopL} {
        font-size: 9vw;
    }
    @media ${device.tablet} {
        font-size: 73px;
    }
`

export const NavLogo = Styled(Logo)`
    font-size: ${props => props.staticSize || "25px"};
    letter-spacing: 1px;
    font-weight : 800;
`

export const SubTitle = Styled.h2`
    font-size: 2.2vw;
    text-align : center;
    -webkit-text-stroke: 1px #000;
    color : ${props => props.color || black}
    margin-bottom : 20px;

    @media ${device.laptopL} {
        font-size: 2.2vw;
    }
    @media ${device.tablet} {
        font-size: 19px;
    }

    
`;

export const InputBox = Styled.div`
    position: relative;
    min-width: 320px;
    width: 70%;
    height: 60px;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr 60px;
    box-shadow : 1px 2px 5px black;
    border-radius : 4px;
    margin: 0 auto;
    @media ${device.laptop} {
        width: 60%;
    }
`;

export const TextInput = Styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
`;

export const ArrowBox = Styled.div`
    display : flex;
    align-items : center;
    justify-content: center;
`;

export const ColorText = Styled.span`
    display: ${props => props.show || "inline-block"};
    color: ${props => props.color || "white"};
`

export const Navbar = Styled.div`
    display: grid;
    width: 100vw;
    height: 40px;
    position: fixed;
    grid-template-columns: repeat(2, auto) 1fr repeat(${props => props.searchShow ? 2 : 1 }, auto);
    // border-bottom: 1px solid hsl(0, 0%, 20%);
    box-shadow: 0px 1px 3px hsl(200, 19%, 18%);
    background-color: hsl(203, 67%, 12%);
`

export const NavbarItem = Styled.div`
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:first-child{
        border-right: 0.2pt solid white;
    }
    position: relative;
`

export const NavbarGridItem = Styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 0 10px;
    column-gap: 10px;
`

export const NavText = Styled.span`
    font-size: 25px;
    margin-top: 4px;
    color: white;
    font-weight: normal;
    &:hover{
        color: hsl(27, 98%, 83%);
    }
`

export const NavSearch = Styled.input`
    position: relative;
    background-color: hsl(219, 33%, 21%);
    display: block;
    outline: none;
    border: none;
    border-radius: 2px;
    height: 28px;
    margin-bottom: 1px;
    padding-left: 10px;
    &:focus{
        color: white;
    }
    &:focus::placeholder{
        color: white;
    }
`

export const NavStatusIcon = Styled.div`
    font-size: 18px;
    color: ${props => {
        switch(props.status){
            case "online":
                return css`hsl(131, 58%, 64%)`
            default:
                return css`white`
        }
    }};
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    & svg{
        ${props => {
            if(props.isFetching) {
              return css`animation: ${props => props.counterSpin ? counterSpin : spin} ${1500}ms linear infinite`
            }
        }}
    }
   
`

const spin = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`

const counterSpin = keyframes`
    from{
        transform: rotate(360deg);
    }
    to{
        transform: rotate(0deg);
    }
`

export const SI_Layer_1 = Styled.div`
    display: grid;
    padding-left: 97px;
    padding-right: 97px;
    padding-top: 70px;
    padding-bottom: 30px;
    margin: 0 auto;
    grid-template-columns: 360px 1fr;
    column-gap: 30px;
`

export const SI_Layer_2 = Styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows : auto auto;
    row-gap: 30px;
`

export const SI_Layer_2__Left = Styled(SI_Layer_2)`
`

export const SI_Layer_2__Right = Styled(SI_Layer_2)`
    grid-template-rows: auto 1fr;
`

export const QC_Box = Styled.div`
    width: 100%;
    height: auto;
    border-radius: 2px;
    background-color: white;
    overflow: hidden;
    min-height: 300px;
    border: 1px solid #ccc;
    box-shadow : 0 2px 2px hsla(203, 67%, 12%, 0.5);
`

export const QC_Types = Styled.div`
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 40px 1fr;
    border-bottom: 1px solid #ccc;
`

export const QC_DropDown = Styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    height: 100%;
    position: relative;
    border : ${props => props.borderShow ? "1px solid #ccc" : "none"};
`

export const QC_DropDownListBox = Styled.div`
    position: absolute;
    background-color: rgba(250,250,250,.9);
    overflow: auto;
    top: 41px;
    width: 100%;
    height: auto;
    transition: all 0.6s ease;
    max-height: ${props => (props.show ? "300px" : "0")};
    color: ${props => props.show ? "hsl(203, 67%, 12%)" : "transparent"};
    border-bottom-left-radius : 4px;
    border-bottom-right-radius : 4px;
    z-index: 2;
    &::-webkit-scrollbar{
        display:none;
    }
`

export const QC_DropDownList = Styled(FlexCenteredBox)`
    height: 40px;
    justify-content: flex-start;
    padding-left: 10px;
    font-weight: bold;
    &:hover{
        background-color: hsla(54, 100%, 89%, .5);
        cursor: pointer;
    }
    font-size: 15px;
`
export const QC_DropDownSelected = Styled(QC_DropDownList)`    
    background-color : ${props => props.bgColor || "hsl(203, 67%, 12%)"};
    color: ${props => props.color || "white"};
    font-weight: bold;
    // color: hsl(203, 67%, 12%);
    &:hover{
        background-color: ${props => props.bgColor || "hsl(203, 67%, 12%)"};
    }
`

export const QC_DropDownIconBox = Styled(FlexCenteredBox)`
    cursor: pointer;
`

export const QC_Type = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.selected ? "hsla(203, 67%, 12%, 0.5)" : "white"};
    font-weight: bold;
    font-size: 13px;
    cursor: pointer
    transition: background-color 0.4s ease;
    transition: color 0.4s ease;
    &:not(:last-child){
        border-right: 1px solid #ccc;
    }
    &:hover{
        background-color: hsl(203, 67%, 12%);
        color: white;
    }
`

export const QC_Refresh = Styled(QC_Type)`
    border-top-left-radius : 2px;
    border-bottom : none;
    background : ${props => props.bg ? props.bg : "white"};
    color: white;
    & > .refreshIcon{
        transform: rotate(62deg);
        font-size: 35px;
        color: white;
        transition: font-size 1s linear;
        cursor: pointer;
    }

`

export const PaddedFlexBox = Styled(FlexBox)`
    padding : ${props => props.value+"px;"}
`

export const PaddedFlexBox_No_Pr = Styled(PaddedFlexBox)`
    padding-right : 0;
`

export const GridBox = Styled.div`
    display: grid;
`
export const PaddedGridBox = Styled(GridBox)`
    padding : ${props => props.value+"px;"}
    width: 100%;
    row-gap : ${props => props.rowGap+"px" || "0"};
`

export const LeagueScoreBox = Styled(GridBox)`
    grid-template-columns : 145px 1fr;
    height : auto;
`

export const LeagueImage = Styled.img`
    width: 125px;
    height: 125px;
`

export const BadgeContainer = Styled(GridBox)`
    height: 40px;
    grid-template-columns: repeat(2,1fr);
    overflow: hidden;
    column-gap: 6px;
    
`

export const BadgeTag = Styled(FlexBox)`
    background-color: hsl(203, 67%, 12%);
    letter-spacing: 1.05px;
    color: white;
    box-shadow: 0 2px 2px black;
    font-size: 14px;
`

export const BadgeValue = Styled(FlexBox)`
    color: ${props => props.color || "black"};
    font-weight: bold;
    font-size: 13px;
    background-color: rgb(245,245,245);
    letter-spacing: 1.05px;
`

export const GaugedNameBar = Styled(GridBox)`
    border-radius : 4px;
    grid-template-rows : auto auto;
    padding: 0 20px;
    overflow: hidden;
`

export const GaugeBar = Styled(GridBox)`
    grid-template-columns : ${props => props.winRate? props.winRate+"%" : "1fr"} ${props => props.looseRate? props.looseRate+"%" : "1fr"};
    height: 6px;
`

export const GaugeBarItem = Styled.div`
    width : 100%;
    height : 100%;
    position: relative;
`

export const Gauge = Styled.div`
    position : absolute;
    height : 100%;
    width : 100%;
    ${props => {
        if(props.pos === "left") {
            return css`left : 0`;
        } else if (props.pos === "right") {
            return css`right : 0`
        }
    }}
    background-Color : ${props => props.color || "hsl(221, 76%, 62%)"};
    animation: Rise ${1000}ms ease forwards;
    @keyframes Rise {
        0%{
            width : 0%;
        }
        100%{
            width : 100%;
        }
    }
`

export const NameBar = Styled(PaddedFlexBox)`
    margin-top : 15px;

    & span{
        color: white;
        border-radius : 2px;
        background-color : hsl(203,67%,12%);
        padding : 5px 10px;
        box-shadow: 0 2px 2px black;
        letter-spacing: 1.04px;
    }
`

export const MP_Box = Styled(QC_Box)`
    height: calc(100vh - 430px);    
    overflow : auto;
    display: grid;
    row-gap: 15px;
    padding: 15px;
    &::-webkit-scrollbar{
        display : none;
    }
`

export const MP_Item = Styled.div`
    border-bottom: 1px solid #ccc;
    padding-bottom : 15px;
    box-shadow: ${props => props.shadow ? "0 2px 4px #ccc" : "none"};
    cursor : ${props => props.selectable ? "pointer" : "default"};
    transition: box-shadow 300ms ease;
    &:hover{
        box-shadow: 0 2px 4px #ccc;
    }
    &:(:last-child){
        border-botton: none;
    }
`

export const MP_Game_Gauge_Box = Styled.div`
    height : 20px;
    display: grid;
    background-color : rgba(250,250,250,0.7);
    position: relative;
    grid-template-columns : ${props => props.playRate? props.playRate+"% 1fr" : "1fr"}
`

export const MP_Game_Gauge_Bar = Styled.div`
    height: 100%;
    background-image: linear-gradient(to right, hsl(195, 100%, 36%), hsl(14, 73%, 62%));
    // border-radius : 4px;
    animation: GaugeRise ${2000}ms ease forwards;
    @keyframes GaugeRise {
        0%{
            width : 0%;
        }
        100%{
            width : 100%;
        }
    }
`

export const MP_Game_Text = Styled(FlexBox)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-weight: bold;
`

export const MP_Content_Box = Styled(GridBox)`
    height: auto;
    position: relative;
    grid-template-columns: 60px 1fr;
    padding: 15px;
    column-gap: 15px;
    & > .workingIcon{
        position: absolute
        right: 15px;
        top: 15px;
        font-size: 20px;
        color: ${props => props.iconColor || "hsl(0, 0%, 26%)"};
        ${props => {
            if(props.isAnalyzing) {
              return css`animation: ${spin} ${1500}ms ease-in-out infinite`
            }
        }}
    }        
`

export const MP_Content_Champion = Styled(FlexBox)`
    overflow: hidden;
    
`

export const MP_Content_Champion_Image = Styled.img`
    width : 100%;
    border-radius: 4px;
`

export const MP_Content_Info = Styled(FlexBox)`

`

export const MP_Champion_Name = Styled.p`
    padding: 0px 6px;
    color: white;
    background: hsl(203,67%,12%);
    border-radius: 4px;
    box-shadow: 0 2px 2px black;
`

export const MP_Champion_Title = Styled.p`
    color: hsl(200, 19%, 18%);
    font-style: italic;
`

export const MP_Champion_Tags = Styled.span`

`
export const MP_Control_Box = Styled.div`
    display: grid;
    height: 40px;
    grid-template-columns : repeat(2,1fr);
`

export const MP_Control_Button = Styled(FlexBox)`
    & span{
        cursor : pointer;
        padding: 0px 6px;
        color: white;
        background: hsl(203,67%,12%);
        border-radius: 4px;
        box-shadow: 0 2px 2px black;
    }
`

export const MP_Control_State_Text = Styled(FlexBox)`
    color : ${props => props.color || "#ccc"};
`

export const CS_Box = Styled(QC_Box)`
    height: auto;
    min-height : auto;
    padding : 15px;
    overflow: visible;
`

export const CS_Query_Filter = Styled(GridBox)`
    grid-template-columns : 1fr 1fr;
    column-gap : 15px;
    height : 40px;
`

export const CS_Two_Column = Styled(GridBox)`
    grid-template-columns : 1fr 1fr;
    column-gap : 15px;
`

export const CS_Query_Select = Styled.select`
    width : 100%;
    height : 100%;

    & option{
        font-size : 14px;
    }
`

export const CS_Radio_Grid = Styled(GridBox)`
    grid-template-columns : 40px auto;
    height : 100%;

    &:last-child{
        margin-left : 15px;
    }
`

export const CS_Radio_Outer_Circle = Styled.div`
    cursor : pointer;
    width : 50%;
    height : 50%;
    padding : 2px;
    border-radius : 50%;
    border : 2px solid hsl(203, 67%, 12%);
    display : flex;
    align-items : center;
    justify-content : center;
`

export const CS_Radio_Inner_Circle = Styled.div`
    width : 100%;
    height : 100%;
    border-radius : 50%;
    background-color : ${props => props.on ? "hsl(221, 76%, 62%);" : "transparent"};
`
export const CD_Wrapper = Styled(QC_Box)`
    grid-template-rows : auto 1fr;
    display : grid;
    position : relative;
    padding : 15px;
    row-gap : 15px;
`

export const CD_Chart_List = Styled(GridBox)`
    grid-template-columns : 1fr auto;
    column-gap : 15px;
`

export const CD_Visualize_Button = Styled(FlexBox)`
    font-size: 15px;
    width: 100px;
    background: rgb(9, 35, 51);
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 2px black;
`

export const CD_Chart_Container = Styled.div`
    box-shadow: 0 2px 4px #ccc;
`

export const CD_Absolute_Hover = Styled.div`
    position : absolute;
    top : 0;
    bottom : 0;
    width : 100%;
`
