import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm3 from '../CreateAccountForm3'

describe('CreateAccountForm3 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm3 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('cityName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'cityName', value: 'Mno' } }
    const wrapper = shallow(<CreateAccountForm3 onChange={mockFn} />)
    wrapper.find({ name: 'cityName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('stateName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'stateName', value: 'PQ' } }
    const wrapper = shallow(<CreateAccountForm3 onChange={mockFn} />)
    wrapper.find({ name: 'stateName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('postalCode input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'postalCode', value: '55' } }
    const wrapper = shallow(<CreateAccountForm3 onChange={mockFn} />)
    wrapper.find({ name: 'postalCode' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
