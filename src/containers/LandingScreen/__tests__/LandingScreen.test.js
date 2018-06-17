import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
jest.mock('../../../dependencies/cognito', () => {
  return {
    createAccount: jest.fn(() => Promise.resolve()),
    authAccount: jest.fn(() => Promise.resolve()),
    clearCachedCognitoTokens: jest.fn()
  }
})
import * as Cognito from '../../../dependencies/cognito'
import { LandingScreen } from '../LandingScreen'

describe('Landing Screen component', () => {
  it("displays 'Demo web client...' copy", () => {
    const copy = 'Demo web client for Mx! platform.'
    const wrapper = shallow(<LandingScreen />)
    expect(
      wrapper
        .find('p')
        .render()
        .text()
    ).toBe(copy)
  })

  it('has initial state', done => {
    const firstKey = 'account'
    const firstKeyValue = ''
    const secondKey = 'password'
    const secondKeyValue = ''
    const state = shallow(<LandingScreen />).instance().state
    process.nextTick(() => {
      expect(state).toHaveProperty(firstKey, firstKeyValue)
      expect(state).toHaveProperty(secondKey, secondKeyValue)
      done()
    })
  })

  it('componentDidMount is called', done => {
    const componentDidMountSpy = jest.spyOn(
      LandingScreen.prototype,
      'componentDidMount'
    )
    const wrapper = shallow(<LandingScreen />)
    process.nextTick(() => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1)
      componentDidMountSpy.mockRestore()
      done()
    })
  })

  it('componentDidMount calls handleEventListener', () => {
    const clickMock = jest.fn()
    const querySelectorMock = jest.fn().mockImplementation(() => {
      return {
        click: clickMock
      }
    })
    document.querySelector = querySelectorMock
    const event = { key: 'Enter', preventDefault: jest.fn() }
    const handleEventListenerSpy = jest.spyOn(
      LandingScreen.prototype,
      'handleEventListener'
    )
    const wrapper = mount(
      <MemoryRouter>
        <LandingScreen />
      </MemoryRouter>
    ).find(LandingScreen)
    const instance = wrapper.instance()
    instance.handleEventListener(event)
    instance.setState({ account: '', password: '' })
    wrapper.find('.landing-screen').simulate('keypress', { key: 'Enter' })
    expect(handleEventListenerSpy).toHaveBeenCalledTimes(1)
    handleEventListenerSpy.mockRestore()
  })

  it('uses handleChange to add items to state', done => {
    const event = { target: { name: 'account', value: 'JoeSmith' } }
    const wrapper = shallow(<LandingScreen />)
    const instance = wrapper.instance()
    instance.setState({ account: '', password: '' })
    process.nextTick(() => {
      instance.handleChange(event)
      process.nextTick(() => {
        const accountInState = instance.state.account
        expect(accountInState).toBe(event.target.value)
        done()
      })
    })
  })

  it('uses handleAuth to send auth request to Cogito', done => {
    const wrapper = shallow(<LandingScreen />)
    const instance = wrapper.instance()
    instance.setState({ account: 'JoeSmith', password: 'password' })
    process.nextTick(() => {
      instance.handleAuth()
      process.nextTick(() => {
        expect(Cognito.authAccount).toHaveBeenCalled()
        done()
      })
    })
  })
})
