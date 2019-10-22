import React from 'react';
import Styled from 'styled-components';

const TodoDiv = Styled.div`
    height: 50px;
    width: 200px;
    border-radius: 4px;
    background-color: tomato;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Todo = ({title}) => {

    return(
        <TodoDiv>
            {title}
        </TodoDiv>
    )

}

export default Todo;