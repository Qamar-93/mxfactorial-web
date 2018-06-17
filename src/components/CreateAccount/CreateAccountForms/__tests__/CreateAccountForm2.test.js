import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm2 from '../CreateAccountForm2'

describe('CreateAccountForm2 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm2 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('streetNumber input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'streetNumber', value: '11' } }
    const wrapper = shallow(<CreateAccountForm2 onChange={mockFn} />)
    wrapper.find({ name: 'streetNumber' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('streetName input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'streetName', value: 'Twenty Two' } }
    const wrapper = shallow(<CreateAccountForm2 onChange={mockFn} />)
    wrapper.find({ name: 'streetName' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('floorNumber input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'floorNumber', value: '33' } }
    const wrapper = shallow(<CreateAccountForm2 onChange={mockFn} />)
    wrapper.find({ name: 'floorNumber' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('unit input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'unit', value: '44' } }
    const wrapper = shallow(<CreateAccountForm2 onChange={mockFn} />)
    wrapper.find({ name: 'unit' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
