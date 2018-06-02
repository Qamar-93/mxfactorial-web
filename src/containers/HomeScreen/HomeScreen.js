import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'reactstrap'
import './HomeScreen.css'
import { SumItemValues, SumItemValuesEmpty } from './SumItemValues'
import { MobileNav } from '../../components/MobileNav/MobileNav'
import { DisableScreen } from '../../components/DisableScreen/DisableScreen'
import { TransactionItem } from '../../components/TransactionItem/TransactionItem'
import { AddIcon } from './AddIcon'
import { SubtractIcon } from './SubtractIcon'
import { Hamburger } from '../../components/Hamburger/Hamburger'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuIsActive: false,
      creditButtonIsActive: true,
      transactionItems: []
    }
  }

  componentDidMount() {
    this.handleAddTransactionItem()
  }

  handleNav() {
    let opts = {
      capture: true,
      once: true
    }
    if (!this.state.menuIsActive) {
      this.setState(
        {
          ...this.state,
          menuIsActive: true
        },
        () => {
          window.addEventListener(
            'click',
            e => {
              e.stopPropagation()
              this.setState({
                ...this.state,
                menuIsActive: false
              })
            },
            opts
          )
        }
      )
    }
  }

  handleCreateItemKey() {
    const uuid = a =>
      a
        ? (0 | (Math.random() * 16)).toString(16)
        : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, uuid)
    return uuid()
  }

  handleCreateEmptyItem() {
    return {
      transactionItemKey: this.handleCreateItemKey(),
      name: '',
      price: '',
      quantity: ''
    }
  }

  handleSwitchButtonState(e) {
    const eventType = e.type
    if (eventType === 'click' && this.state.creditButtonIsActive) {
      this.setState({
        ...this.state,
        creditButtonIsActive: false
      })
    } else if (eventType === 'mousedown' && !this.state.creditButtonIsActive) {
      this.setState({
        ...this.state,
        creditButtonIsActive: true
      })
    }
  }

  handleAddTransactionItem() {
    const transactionItemPixelHeight = 215
    const newTransactionItem = this.handleCreateEmptyItem()
    this.setState(
      {
        ...this.state,
        transactionItems: [...this.state.transactionItems, newTransactionItem]
      },
      () => window.scrollBy(0, transactionItemPixelHeight)
    )
  }

  handleAddAndRemoveTransactionItem() {
    //used only by handleRemoveTransactionItem() to avoid error caused by
    //setState triggering a rerender after array length is reduced to 0.
    //solution: add first, then remove undesired item
    const newTransactionItem = this.handleCreateEmptyItem()
    this.setState(
      {
        ...this.state,
        transactionItems: [...this.state.transactionItems, newTransactionItem]
      },
      () => {
        let updatedTransactionItems = this.state.transactionItems
        let indexOfUndesiredItem
        //test to avoid deleting new transaction item
        for (let i = 0; i < updatedTransactionItems.length; i++) {
          if (!(Object.is(updatedTransactionItems[i]), newTransactionItem)) {
            indexOfUndesiredItem = i
          }
        }
        updatedTransactionItems.splice(indexOfUndesiredItem, 1)
        this.setState(
          {
            ...this.state,
            transactionItems: updatedTransactionItems
          },
          () => {
            //manually clear inputs
            document.getElementsByClassName('transaction-item-name')[0].value =
              ''
            document.getElementsByClassName('transaction-item-value')[0].value =
              ''
            document.getElementsByClassName(
              'transaction-item-quantity'
            )[0].value =
              ''
          }
        )
      }
    )
  }

  handleRemoveTransactionItem(itemIndex) {
    if (this.state.transactionItems.length < 2) {
      this.handleAddAndRemoveTransactionItem()
      return
    }
    const undesiredTransactionItem = this.state.transactionItems[itemIndex]
    let initialTransactionItems = [...this.state.transactionItems]
    let indexOfUndesiredItemInState
    //test for undesired item
    for (let i = 0; i < initialTransactionItems.length; i++) {
      if (Object.is(initialTransactionItems[i], undesiredTransactionItem)) {
        indexOfUndesiredItemInState = i
      }
    }
    initialTransactionItems.splice(indexOfUndesiredItemInState, 1)
    // renaming to modifiedTransactionItems for readability
    const modifiedTransactionItems = [...initialTransactionItems]
    this.setState({
      ...this.state,
      transactionItems: modifiedTransactionItems
    })
  }

  handleChange(e, itemIndex) {
    let item = this.state.transactionItems[itemIndex]
    item[e.target.name] = e.target.value
    let stateTransactionItems = [...this.state.transactionItems]
    stateTransactionItems.splice(itemIndex, 1, item)
    //solution not immutable
    this.setState({
      ...this.state,
      transactionItems: stateTransactionItems
    })
  }

  //For testing
  showState() {
    console.log(this.state)
  }

  render() {
    //create condition to show 'total' or float
    const isZeroSum =
      this.state.transactionItems.reduce((accumulator, currentValue) => {
        let price = parseFloat(currentValue.price)
        if (isNaN(price)) {
          price = 0
        }
        return accumulator + parseFloat(price)
      }, 0) === 0

    return (
      <div>
        <header />
        <main
          className={
            'home-screen-content ' + (this.state.menuIsActive ? 'blur' : '')
          }
        >
          {this.state.menuIsActive ? <DisableScreen /> : ''}
          <div className="account-container">
            <div className="account-display">
              <div className="account-label">account</div>
              <div className="account-value">
                <i>{'FirstMiddleLast'}</i>
              </div>
            </div>
          </div>
          <div className="indicator-container">
            <span className="indicator debitor-account-balance-display-cell">
              balance
            </span>
          </div>
          <input
            className="input-theme recipient-account-input"
            type="text"
            placeholder="recipient"
          />
          <div className="indicator-container">
            {isZeroSum ? (
              <SumItemValuesEmpty />
            ) : (
              <SumItemValues transactionItems={this.state.transactionItems} />
            )}
          </div>
          <ButtonGroup className="d-flex debit-credit-buttons">
            <Button
              className={
                'debit-button w-100 ' +
                (this.state.creditButtonIsActive ? 'inactive' : '')
              }
              onClick={e => this.handleSwitchButtonState(e)}
            >
              <SubtractIcon
                cssClass="debit-button-icon"
                width={18}
                height={18}
              />{' '}
              debit
            </Button>
            <Button
              className={
                'credit-button w-100 ' +
                (!this.state.creditButtonIsActive ? 'inactive' : '')
              }
              onMouseDown={e => this.handleSwitchButtonState(e)}
            >
              credit{' '}
              <AddIcon with={18} height={18} cssClass="credit-button-icon" />
            </Button>
          </ButtonGroup>
          <form
            className="transaction-items"
            data-item-count={this.state.transactionItems.length}
          >
            {this.state.transactionItems.map((itemObj, index) => (
              <TransactionItem
                key={index}
                uuid={this.state.transactionItems[index].transactionItemKey}
                itemIndex={index}
                handleChange={this.handleChange.bind(this)}
                removeItem={this.handleRemoveTransactionItem.bind(this)}
                namevalue={this.state.transactionItems[index]['name']}
                price={this.state.transactionItems[index]['price']}
                quantity={this.state.transactionItems[index]['quantity']}
              />
            ))}
            <button
              className="button-theme add-item"
              onClick={() => this.handleAddTransactionItem()}
              type="button"
            >
              <AddIcon width={20} height={20} cssClass="add-item-icon" /> item
            </button>
            <button
              className={
                'button-theme ' +
                (this.state.creditButtonIsActive ? 'request' : 'transact')
              }
              type="button"
            >
              {this.state.creditButtonIsActive ? 'Request' : 'Transact'}
            </button>
          </form>
          {/* <div>
            <button
              className="button-theme test-button"
              onClick={() => this.showState()}
            >
              Show State
            </button>
          </div> */}
        </main>
        <footer>
          <nav className="mobile-nav">
            <Hamburger
              handleNav={() => this.handleNav()}
              menuIsActive={this.state.menuIsActive}
            />
            <div className="mobile-nav__buttons" />
            {this.state.menuIsActive ? <MobileNav /> : ''}
          </nav>
        </footer>
      </div>
    )
  }
}

HomeScreen.propTypes = {
  transactionItems: PropTypes.array,
  onClick: PropTypes.func,
  cssClass: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  onMouseDown: PropTypes.func,
  key: PropTypes.number,
  uuid: PropTypes.string,
  itemIndex: PropTypes.number,
  handleChange: PropTypes.func,
  removeItem: PropTypes.func,
  namevalue: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string,
  handleNav: PropTypes.func,
  menuIsActive: PropTypes.bool
}

export { HomeScreen }
