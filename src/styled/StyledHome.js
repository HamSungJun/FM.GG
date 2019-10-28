import Styled from "styled-components";
import {device} from './device.js'

export const Box = Styled.div`
    width: 100vw;
    height: 100vh;
    justify-content: center;
    background-color: hsl(210, 67%, 60%);
`;

export const Container = Styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding-top: 80px;
`;

export const Title = Styled.h1`
    font-size: 9vw;
    text-align : center;
    -webkit-text-stroke: 2px #000;
    // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    letter-spacing: 0.7vw;
    color : ${props => props.color || black};
    box-sizing: content-box;
    @media ${device.laptopL} {
        font-size: 9vw;
    }
    @media ${device.tablet} {
        font-size: 73px;
    }
`;

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
    display: inline-block;
    color: ${props => props.color || "white"};
`