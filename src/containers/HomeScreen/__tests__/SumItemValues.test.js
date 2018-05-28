import React from 'react'
import { shallow } from 'enzyme'

import { SumItemValues, SumItemValuesEmpty } from '../SumItemValues'

const randomInt = () => Math.floor(Math.random() * 10)

const testStringTypedItems = [
  {
    name: 'bread',
    price: '3',
    quantity: '1',
    transactionItemKey: 'a'
  },
  {
    name: 'milk',
    price: '4',
    quantity: '2',
    transactionItemKey: 'b'
  },
  {
    name: 'honey',
    price: '5',
    quantity: '3',
    transactionItemKey: 'c'
  }
]

const testRandomItems = [
  {
    name: 'bread',
    price: randomInt(),
    quantity: randomInt(),
    transactionItemKey: 'd'
  },
  {
    name: 'milk',
    price: randomInt(),
    quantity: randomInt(),
    transactionItemKey: 'e'
  },
  {
    name: 'honey',
    price: randomInt(),
    quantity: randomInt(),
    transactionItemKey: 'f'
  }
]

describe('Sum item values component', () => {
  it('renders with string inputs', () => {
    const wrapper = shallow(
      <SumItemValues transactionItems={testStringTypedItems} />
    )
    expect(
      wrapper.find('.sum-transaction-item-value-display-cell')
    ).toHaveLength(1)
  })

  it('reduces price time quantity', () => {
    const mapReduced = testRandomItems
      .map(item => item.price * item.quantity)
      .reduce((acc, curr) => {
        return acc + curr
      })
      .toString()
    const wrapper = shallow(
      <SumItemValues transactionItems={testRandomItems} />
    )
    expect(
      wrapper
        .find('.sum-transaction-item-value-display-cell')
        .children()
        .text()
    ).toBe(mapReduced)
  })
})

describe('Empty sum item values component', () => {
  it("renders with 'total' copy", () => {
    const copy = 'total'
    const wrapper = shallow(<SumItemValuesEmpty />)
    expect(
      wrapper
        .find('.indicator')
        .children()
        .text()
    ).toBe(copy)
  })
})
