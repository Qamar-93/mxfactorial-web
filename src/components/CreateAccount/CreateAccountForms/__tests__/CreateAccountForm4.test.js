import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm4 from '../CreateAccountForm4'

describe('CreateAccountForm4 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm4 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('countryDialingCode input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'countryDialingCode', value: '66' } }
    const wrapper = shallow(<CreateAccountForm4 onChange={mockFn} />)
    wrapper.find({ name: 'countryDialingCode' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('areaCode input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'areaCode', value: '77' } }
    const wrapper = shallow(<CreateAccountForm4 onChange={mockFn} />)
    wrapper.find({ name: 'areaCode' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('phoneNumber input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'phoneNumber', value: '88' } }
    const wrapper = shallow(<CreateAccountForm4 onChange={mockFn} />)
    wrapper.find({ name: 'phoneNumber' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
