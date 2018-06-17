import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm1 from '../CreateAccountForm1'

describe('CreateAccountForm1 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm1 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('firstName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'firstName', value: 'Abc' } }
    const wrapper = shallow(<CreateAccountForm1 onChange={mockFn} />)
    wrapper.find({ name: 'firstName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('middleName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'middleName', value: 'Def' } }
    const wrapper = shallow(<CreateAccountForm1 onChange={mockFn} />)
    wrapper.find({ name: 'middleName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('lastName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'lastName', value: 'Ghi' } }
    const wrapper = shallow(<CreateAccountForm1 onChange={mockFn} />)
    wrapper.find({ name: 'lastName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('country input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'country', value: 'Jkl' } }
    const wrapper = shallow(<CreateAccountForm1 onChange={mockFn} />)
    wrapper.find({ name: 'country' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
