import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './TodoList.jsx';

const Root = () => {

    return (
        <div>
            <TodoList />
        </div>
    )
    
}


ReactDOM.render(<Root />, document.getElementById("root"));