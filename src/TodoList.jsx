import React from 'react';
import Todo from './Todo.jsx';

class TodoList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            todos: []
        }

        this.addTodo = this.addTodo.bind(this);
        this.renderTodos = this.renderTodos.bind(this);
        this.resetTodo = this.resetTodo.bind(this);
    }

    addTodo(){
        const {todos} = this.state;
        const newTodo = `할일-${todos.length+1}`
        this.setState({
            todos : [...todos, newTodo]
        })
    }

    resetTodo(){
        this.setState({
            todos : []
        })
    }

    renderTodos(){
        return this.state.todos.map((el,index)=> {
            return(
                <Todo key={index} title={el}/>
            )
        })
    }

    render(){
        const {todos} = this.state;
        return(
            <div>
                <button onClick={this.addTodo}>
                    할 일 추가
                </button>
                <button onClick={this.resetTodo}>
                    할 일 초기화
                </button>
                {this.renderTodos()}
            </div>
        )
    }


}

export default TodoList;