import React from 'react'
import { shallow } from 'enzyme'
import CreateAccountForm6 from '../CreateAccountForm6'

describe('CreateAccountForm6 stateless component', () => {
  it('displays', () => {
    const wrapper = shallow(<CreateAccountForm6 />)
    expect(wrapper.find('.create-account-form__container')).toHaveLength(1)
  })

  it('account input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'account', value: 'TestAccount' } }
    const wrapper = shallow(<CreateAccountForm6 onChange={mockFn} />)
    wrapper.find({ name: 'account' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('password input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = { target: { name: 'password', value: 'bluesky' } }
    const wrapper = shallow(<CreateAccountForm6 onChange={mockFn} />)
    wrapper.find({ name: 'password' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })

  it('emailAddress input triggers onChange event', () => {
    const mockFn = jest.fn()
    const event = {
      target: { name: 'emailAddress', value: 'testabc@mailinator.com' }
    }
    const wrapper = shallow(<CreateAccountForm6 onChange={mockFn} />)
    wrapper.find({ name: 'emailAddress' }).simulate('change', event)
    expect(mockFn).lastCalledWith(event)
  })
})
