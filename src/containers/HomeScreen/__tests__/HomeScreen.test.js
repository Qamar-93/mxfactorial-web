import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { HomeScreen } from '../HomeScreen'

let mockStorage = {}
window.localStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  clear: () => (mockStorage = {})
}

describe('Home screen component', () => {
  it('renders', () => {
    const history = { push: jest.fn() }
    const container = mount(
      <MemoryRouter initialEntries={['/account']}>
        <Switch>
          <Route
            component={props => <HomeScreen {...props} history={history} />}
            path="/account"
          />
        </Switch>
      </MemoryRouter>
    )
    const instance = container.instance()
    instance.setState({ currentAccount: 'someAccount' })
    expect(container).toHaveLength(1)
  })

  it('componentDidMount is called', done => {
    const componentDidMountSpy = jest.spyOn(
      HomeScreen.prototype,
      'componentDidMount'
    )
    const wrapper = shallow(<HomeScreen />)
    //setState is async. setting the nextTick()
    //pattern here in case tests begin to fail
    process.nextTick(() => {
      expect(HomeScreen.prototype.componentDidMount).toHaveBeenCalledTimes(1)
      componentDidMountSpy.mockClear()
      done()
    })
  })

  it('has initial state', done => {
    const firstKey = 'creditButtonIsActive'
    const firstKeyValue = true
    const secondKey = 'menuIsActive'
    const secondKeyValue = false
    const thirdKey = 'transactionItems'
    const state = shallow(<HomeScreen />).instance().state
    process.nextTick(() => {
      expect(state).toHaveProperty(firstKey, firstKeyValue)
      expect(state).toHaveProperty(secondKey, secondKeyValue)
      expect(state).toHaveProperty(thirdKey)
      done()
    })
  })

  it('has transaction item in initial state', done => {
    const firstKey = 'transactionItemKey'
    const firstKeyValueRegExp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g
    const secondKey = 'name'
    const secondKeyValue = ''
    const thirdKey = 'price'
    const thirdKeyValue = ''
    const fourthKey = 'quantity'
    const fourthKeyValue = ''
    const initialTransactionItem = shallow(<HomeScreen />).instance().state
      .transactionItems[0]
    process.nextTick(() => {
      expect(initialTransactionItem).toHaveProperty(firstKey)
      expect(initialTransactionItem[firstKey]).toMatch(firstKeyValueRegExp)
      expect(initialTransactionItem).toHaveProperty(secondKey, secondKeyValue)
      expect(initialTransactionItem).toHaveProperty(thirdKey, thirdKeyValue)
      expect(initialTransactionItem).toHaveProperty(fourthKey, fourthKeyValue)
      done()
    })
  })

  it('uses handleNav method to only trigger nav menu open', done => {
    const menuIsActiveTrue = true
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    instance.handleNav()
    process.nextTick(() => {
      const menuIsActive = instance.state.menuIsActive
      expect(menuIsActive).toBe(menuIsActiveTrue)
      instance.handleNav()
      process.nextTick(() => {
        const menuIsActiveAgain = instance.state.menuIsActive
        expect(menuIsActiveAgain).toBe(menuIsActiveTrue)
        done()
      })
    })
  })

  it('uses handleCreateItemKey to issue a 16 digit id', () => {
    const regexp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    const uuid = instance.handleCreateItemKey()
    expect(uuid).toMatch(regexp)
  })

  it('uses handleCreateEmptyItem to create empty transaction item object', () => {
    const key1 = 'transactionItemKey'
    const key2 = 'name'
    const key3 = 'price'
    const key4 = 'quantity'
    const transactionItemKeyRegExp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g
    const name = ''
    const price = ''
    const quantity = ''
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    const itemCreated = instance.handleCreateEmptyItem()
    const itemCreatedKeys = Object.keys(itemCreated)
    const filteredKeys = itemCreatedKeys.filter(
      key => key === !key1 || !key2 || !key3 || !key4
    )
    expect(filteredKeys).toHaveLength(0)
    expect(itemCreated).toHaveProperty(key1)
    expect(itemCreated[key1]).toMatch(transactionItemKeyRegExp)
    expect(itemCreated).toHaveProperty(key2, name)
    expect(itemCreated).toHaveProperty(key3, price)
    expect(itemCreated).toHaveProperty(key4, quantity)
  })

  it('uses handleSwitchButtonState to trigger active debit and credit button states', done => {
    const clickEvent = { type: 'click' }
    const mouseDownEvent = { type: 'mousedown' }
    const creditButtonState = true
    const debitButtonState = false
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    instance.handleSwitchButtonState(clickEvent)
    process.nextTick(() => {
      const creditButtonIsNOTActive = instance.state.creditButtonIsActive
      expect(creditButtonIsNOTActive).toBe(debitButtonState)
      instance.handleSwitchButtonState(mouseDownEvent)
      process.nextTick(() => {
        const creditButtonIsActive = instance.state.creditButtonIsActive
        expect(creditButtonIsActive).toBe(creditButtonState)
        done()
      })
    })
  })

  it('uses handleAddTransactionItem to add a transaction item to state', done => {
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    const initialTransactionItemsCount = instance.state.transactionItems.length
    expect(initialTransactionItemsCount).toBe(1)
    instance.handleAddTransactionItem()
    process.nextTick(() => {
      const modifiedTransactionItemsCount =
        instance.state.transactionItems.length
      expect(modifiedTransactionItemsCount).toBe(
        initialTransactionItemsCount + 1
      )
      done()
    })
  })

  it('uses handleAddAndRemoveTransactionItem and clears input elements', done => {
    const mockFn = jest.fn()
    const emptyInput = [{ value: '' }]
    let nameReset = [{ value: 'someName' }]
    let priceReset = [{ value: 5 }]
    let quantityReset = [{ value: 3 }]
    mockFn.mockReturnValueOnce(nameReset)
    mockFn.mockReturnValueOnce(priceReset)
    mockFn.mockReturnValueOnce(quantityReset)
    document.getElementsByClassName = mockFn
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    const initialTransactionItemsCount = instance.state.transactionItems.length
    expect(initialTransactionItemsCount).toBe(1)
    instance.handleAddAndRemoveTransactionItem()
    process.nextTick(() => {
      const modifiedTransactionItemsCount =
        instance.state.transactionItems.length
      expect(modifiedTransactionItemsCount).toBe(initialTransactionItemsCount)
      expect(nameReset[0]).toMatchObject(emptyInput[0])
      expect(priceReset[0]).toMatchObject(emptyInput[0])
      expect(quantityReset[0]).toMatchObject(emptyInput[0])
      expect(mockFn).toHaveBeenCalledTimes(3)
      done()
    })
  })

  it('handleRemoveTransactionItem removes item from array', done => {
    const initialTransactionItems = [
      { transactionItemKey: 'a', name: 'bread', price: 4, quantity: 2 },
      { transactionItemKey: 'b', name: 'milk', price: 5, quantity: 3 },
      { transactionItemKey: 'c', name: 'honey', price: 8, quantity: 2 }
    ]
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    instance.setState({
      ...instance.state,
      transactionItems: [...initialTransactionItems]
    })
    process.nextTick(() => {
      instance.handleRemoveTransactionItem(1)
      process.nextTick(() => {
        const modifiedTransactionItems = instance.state.transactionItems
        expect(modifiedTransactionItems).toHaveLength(2)
        expect(modifiedTransactionItems[0]).toMatchObject(
          initialTransactionItems[0]
        )
        expect(modifiedTransactionItems[1]).toMatchObject(
          initialTransactionItems[2]
        )
        done()
      })
    })
  })

  it('uses handleChange to add items to state', done => {
    const event = { target: { name: 'quantity', value: 5 } }
    const initialTransactionItems = [
      { transactionItemKey: 'a', name: 'bread', price: 4, quantity: 2 },
      { transactionItemKey: 'b', name: 'milk', price: 5, quantity: 3 },
      { transactionItemKey: 'c', name: 'honey', price: 8, quantity: 2 }
    ]
    const transactionItemToModify = 1
    const wrapper = shallow(<HomeScreen />)
    const instance = wrapper.instance()
    instance.setState({
      ...instance.state,
      transactionItems: [...initialTransactionItems]
    })
    process.nextTick(() => {
      instance.handleChange(event, transactionItemToModify)
      process.nextTick(() => {
        const modifiedItemQuantity =
          instance.state.transactionItems[transactionItemToModify].quantity
        expect(modifiedItemQuantity).toBe(event.target.value)
        expect(instance.state.transactionItems).toHaveLength(
          initialTransactionItems.length
        )
        done()
      })
    })
  })
})
