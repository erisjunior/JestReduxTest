import React, { Component } from 'react'

export default class TodoList extends Component {
  state = {
    newTodo: '',
    todos: []
  }

  componentDidMount() {
    const todos = localStorage.getItem('todos')

    if (todos) {
      this.setState({ todos: JSON.parse(todos) })
    }
  }

  handleTodoChange = e => {
    this.setState({
      newTodo: e.target.value
    })
  }

  handleAddNewTodo = () => {
    this.setState(
      {
        todos: [...this.state.todos, this.state.newTodo],
        newTodo: ''
      },
      () => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
      }
    )
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        <input
          type='text'
          name='todo'
          value={this.state.newTodo}
          onChange={this.handleTodoChange}
        />
        <button onClick={this.handleAddNewTodo}>Adicionar</button>
      </div>
    )
  }
}
