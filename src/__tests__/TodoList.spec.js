import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import createStore from 'redux-mock-store'
import TodoList from '../TodoList'

import { Creators as TodoActions } from '../store/ducks/todos'

const mockStore = createStore()

const INITIAL_STATE = {
  todos: { data: ['Fazer Café', 'Estudar'] }
}

const store = mockStore(INITIAL_STATE)

it('should be rendered the list', () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )

  expect(wrapper.find('li').length).toBe(2)
})

it('should be able to add new todos', () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )

  wrapper.find('TodoList').setState({ newTodo: 'NewTodo' })
  wrapper.find('button').simulate('click')

  expect(store.getActions()).toContainEqual(TodoActions.addTodo('NewTodo'))
  // expect(wrapper.find('li').length).toBe(3)
})
