import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import CreateAccount from '../CreateAccount'
import { resetProfile, testProfile } from '../CreateAccount'
jest.mock('../../../dependencies/cognito')
import { Cognito } from '../../../dependencies/cognito'
const mockFunction = jest.fn().mockImplementation(() => Promise.resolve())
Cognito.mockImplementation(() => {
  return {
    createAccount: mockFunction
  }
})

describe('CreateAccount component', () => {
  it('has agrees: false default state', () => {
    const history = { push: jest.fn() }
    const agreesValue = false
    //Router required when rendering components with Link
    //then call .find() to return component under test
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    expect(instance.state.agrees).toBe(agreesValue)
  })

  it("records user's agreement", () => {
    const agreesValue = true
    const history = { push: jest.fn() }
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.agreeHandler()
    expect(instance.state.agrees).toBe(agreesValue)
  })

  it('adds properties to state', () => {
    const history = { push: jest.fn() }
    const mockEvent = {
      target: {
        name: 'firstName',
        value: 'Mary'
      }
    }
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleChange(mockEvent)
    expect(instance.state[mockEvent.target.name]).toBe(mockEvent.target.value)
  })

  it('converts input type to text', () => {
    const history = { push: jest.fn() }
    const typeAfterHandlerCall = 'text'
    let mockEvent = {
      currentTarget: {
        type: 'date'
      }
    }
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleTypeToText(mockEvent)
    expect(mockEvent.currentTarget.type).toBe(typeAfterHandlerCall)
  })

  it('converts input type to date', () => {
    const history = { push: jest.fn() }
    const typeAfterHandlerCall = 'date'
    let mockEvent = {
      currentTarget: {
        type: 'text'
      }
    }
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.handleTypeToDate(mockEvent)
    expect(mockEvent.currentTarget.type).toBe(typeAfterHandlerCall)
  })

  it('sends request to create account', async () => {
    const history = { push: jest.fn() }
    const container = mount(
      <MemoryRouter>
        <CreateAccount history={history} />
      </MemoryRouter>
    ).find(CreateAccount)
    const instance = container.instance()
    instance.setState(testProfile)
    instance.handleCreateAccountRequest()
    await expect(mockFunction).toHaveBeenCalled()
    expect(instance.state).toMatchObject(resetProfile)
  })
})
