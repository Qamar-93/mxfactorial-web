import React from 'react'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, Route } from 'react-router-dom'
jest.mock('../../dependencies/axios', () => {
  return {
    axiosRequest: jest.fn(() => Promise.resolve({ status: 200 }))
  }
})
import * as axios from '../../dependencies/axios'
import CreateAccount from './CreateAccount'
import { resetProfile, testProfile } from './CreateAccount'

describe('CreateAccount component', () => {
  it('has agrees: false default state', () => {
    const agreesValue = false
    //Router required when rendering components with Link
    //then call .find() to return component under test
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    expect(instance.state.agrees).toBe(agreesValue)
  })

  it("records user's agreement", () => {
    const agreesValue = true
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.agreeHandler()
    expect(instance.state.agrees).toBe(agreesValue)
  })

  it('adds properties to state', () => {
    const mockEvent = {
      target: {
        name: 'firstName',
        value: 'Mary'
      }
    }
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleChange(mockEvent)
    expect(instance.state[mockEvent.target.name]).toBe(mockEvent.target.value)
  })

  it('converts input type to text', () => {
    const typeAfterHandlerCall = 'text'
    let mockEvent = {
      currentTarget: {
        type: 'date'
      }
    }
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleTypeToText(mockEvent)
    expect(mockEvent.currentTarget.type).toBe(typeAfterHandlerCall)
  })

  it('converts input type to date', () => {
    const typeAfterHandlerCall = 'date'
    let mockEvent = {
      currentTarget: {
        type: 'text'
      }
    }
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleTypeToDate(mockEvent)
    expect(mockEvent.currentTarget.type).toBe(typeAfterHandlerCall)
  })

  it('sends request to create account', async () => {
    const container = mount(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.setState(testProfile)
    instance.handleCreateAccountRequest()
    await expect(axios.axiosRequest).toHaveBeenCalled()
    expect(instance.state).toMatchObject(resetProfile)
  })
})
