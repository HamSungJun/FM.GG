import React from 'react';
import Styled from 'styled-components';

const Box = Styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const H1 = Styled.h1`
    font-size: 20px;
    margin : 0;
    text-align : center;
`

class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Box>
                <H1>Hello! React!</H1>
            </Box>
        )
    }
}

export default Home;