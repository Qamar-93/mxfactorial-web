import React from 'react'
import { shallow } from 'enzyme'

import { TransactionItem } from '../TransactionItem'

describe('Transaction item component', () => {
  it('renders', () => {
    const wrapper = shallow(<TransactionItem />)
    expect(wrapper.find('.transaction-item-set')).toHaveLength(1)
  })

  it('renders name input and triggers onchange event', () => {
    const wrapper = shallow(<TransactionItem />)
    expect(wrapper.find('.transaction-item-name')).toHaveLength(1)
    const mockFn = jest.fn()
    wrapper.setProps({ handleChange: mockFn })
    expect(mockFn).not.toHaveBeenCalled()
    wrapper.find('.transaction-item-name').simulate('change')
    expect(mockFn).toHaveBeenCalled()
  })

  it('renders price input and triggers onchange event', () => {
    const wrapper = shallow(<TransactionItem />)
    expect(wrapper.find('.transaction-item-value')).toHaveLength(1)
    const mockFn = jest.fn()
    wrapper.setProps({ handleChange: mockFn })
    expect(mockFn).not.toHaveBeenCalled()
    wrapper.find('.transaction-item-value').simulate('change')
    expect(mockFn).toHaveBeenCalled()
  })

  it('renders quantity input and triggers onchange event', () => {
    const wrapper = shallow(<TransactionItem />)
    expect(wrapper.find('.transaction-item-quantity')).toHaveLength(1)
    const mockFn = jest.fn()
    wrapper.setProps({ handleChange: mockFn })
    expect(mockFn).not.toHaveBeenCalled()
    wrapper.find('.transaction-item-quantity').simulate('change')
    expect(mockFn).toHaveBeenCalled()
  })

  it('onclick triggers event from Remove Item icon', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<TransactionItem />).setProps({
      removeItem: mockFn
    })
    expect(mockFn).not.toHaveBeenCalled()
    expect(wrapper.find('span')).toHaveLength(1)
    wrapper.find('span').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
