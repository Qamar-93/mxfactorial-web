import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm5 from '../CreateAccountForm5'

describe('CreateAccountForm5 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm5 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('dateOfBirth input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'dateOfBirth', value: '10-05-1990' } }
    const wrapper = shallow(<CreateAccountForm5 onChange={mockFn} />)
    wrapper.find({ name: 'dateOfBirth' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('industryName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'industryName', value: 'Rst' } }
    const wrapper = shallow(<CreateAccountForm5 onChange={mockFn} />)
    wrapper.find({ name: 'industryName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('occupationName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'occupationName', value: 'Uvw' } }
    const wrapper = shallow(<CreateAccountForm5 onChange={mockFn} />)
    wrapper.find({ name: 'occupationName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
