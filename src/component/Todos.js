import React, { Component } from 'react'
import TodoList from './TodoList'
import PropTypes from 'prop-types'

export class Todos extends Component {
  render() {
      return  this.props.todos.map((todo)=> (
        <TodoList  key={todo.id} todo={todo} markComplete={this.props.markComplete}
          delTodo={this.props.delTodo}  />
    ));
    }
}
//prop types
Todos.propTypes={
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo:PropTypes.func.isRequired,
}

export default Todos
