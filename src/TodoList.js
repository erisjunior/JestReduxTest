import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as TodoActions } from './store/ducks/todos'

class TodoList extends Component {
  state = {
    newTodo: ''
  }

  handleTodoChange = e => {
    this.setState({
      newTodo: e.target.value
    })
  }

  handleAddNewTodo = () => {
    this.props.addTodo(this.state.newTodo)
    this.setState({ newTodo: '' })
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.todos.map(todo => (
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

const mapStateToProps = state => ({
  todos: state.todos.data
})

const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
