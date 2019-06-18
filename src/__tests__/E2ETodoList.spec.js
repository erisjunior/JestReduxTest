import React from 'react'
import { mount } from 'enzyme'

import TodoList from '../E2ETodoList'

it('should be rendered the list and button', () => {
  const wrapper = mount(<TodoList />)

  expect(wrapper.find('ul').exists()).toBe(true)
  expect(wrapper.find("input[name='todo']").exists()).toBe(true)
  expect(wrapper.find('button').exists()).toBe(true)
})

it('should be able to add new todo', () => {
  const wrapper = mount(<TodoList />)

  wrapper.find("input[name='todo']").simulate('change', {
    target: { value: 'NewTodo' }
  })

  wrapper.find('button').simulate('click')

  expect(wrapper.find('ul').contains(<li>NewTodo</li>)).toBe(true)
})

it('should add new todos to local storage', () => {
  const setItemMock = jest.fn()

  global.localStorage.__proto__.getItem = jest.fn().mockReturnValue('[]')
  global.localStorage.__proto__.setItem = setItemMock

  const wrapper = mount(<TodoList />)

  wrapper.setState({ newTodo: 'NewTodo' })
  wrapper.instance().handleAddNewTodo()

  expect(setItemMock).toHaveBeenLastCalledWith(
    'todos',
    JSON.stringify(['NewTodo'])
  )
})

it('should load todos in componentDidMount', () => {
  const getItemMock = jest.fn().mockReturnValue(JSON.stringify(['Fazer Café']))

  global.localStorage.__proto__.getItem = getItemMock

  const wrapper = mount(<TodoList />)

  expect(wrapper.state('todos')).toEqual(['Fazer Café'])
})
