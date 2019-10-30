import Styled from "styled-components";
import {device} from './device.js'

export const Box = Styled.div`
    width: 100vw;
    height: 100vh;
    justify-content: center;
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
    grid-template-columns: auto auto 1fr auto;
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
    display: ${props => props.searchShow || "block"};
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