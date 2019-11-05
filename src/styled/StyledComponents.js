import Styled, { keyframes, css } from "styled-components";
import {device} from './device.js'

export const flexCenteredBox = Styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
`

export const Box = Styled.div`
    width: 100vw;
    height: 100vh;
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
    margin: 0 auto;
    grid-template-columns: 360px 1fr;
    column-gap: 30px;
`

export const SI_Layer_2 = Styled.div`
    display: grid;
    grid-template-columns: 1fr;
    
`

export const SI_Layer_2__Left = Styled(SI_Layer_2)`
    grid-template-rows: repeat(4,auto);
`

export const SI_Layer_2__Right = Styled(SI_Layer_2)`
    grid-template-rows: repeat(2,auto);
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
`

export const QC_DropDownListBox = Styled.div`
    position: absolute;
    background-color: rgba(240,240,240,.7);
    overflow: hidden;
    top: 41px;
    width: 100%;
    height: auto;
    transition: all 0.6s ease;
    max-height: ${props => (props.show ? "300px" : "0")};
    color: ${props => props.show ? "hsl(203, 67%, 12%)" : "transparent"};
    border-bottom-left-radius : 4px;
    border-bottom-right-radius : 4px;

`

export const QC_DropDownList = Styled(flexCenteredBox)`
    height: 40px;
    justify-content: flex-start;
    padding-left: 10px;
    font-weight: bold;
    &:hover{
        background-color: rgba(220,220,220,.7);
    }
    font-size: 15px;
`
export const QC_DropDownSelected = Styled(QC_DropDownList)`
    font-weight: bold;
    color: hsl(203, 67%, 12%);
    border-right: 1px solid #ccc;
`

export const QC_DropDownIconBox = Styled(flexCenteredBox)`
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

