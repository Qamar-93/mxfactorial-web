import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { MobileNav } from '../MobileNav'

describe('Mobile nav component', () => {
  it('renders', () => {
    const wrapper = shallow(<MobileNav />)
    expect(wrapper.find('.mobile-nav__list')).toHaveLength(1)
  })

  it('has Requests item at top of list', () => {
    const copy = 'Requests'
    const wrapper = shallow(<MobileNav />)
    expect(
      wrapper
        .find('ul')
        .childAt(0)
        .text()
    ).toBe(copy)
  })

  it('has History item second in list', () => {
    const copy = 'History'
    const wrapper = shallow(<MobileNav />)
    expect(
      wrapper
        .find('ul')
        .childAt(1)
        .text()
    ).toBe(copy)
  })

  it('has Rules item third in list', () => {
    const copy = 'Rules'
    const wrapper = shallow(<MobileNav />)
    expect(
      wrapper
        .find('ul')
        .childAt(2)
        .text()
    ).toBe(copy)
  })

  it('has Query item fourth in list', () => {
    const copy = 'Query'
    const wrapper = shallow(<MobileNav />)
    expect(
      wrapper
        .find('ul')
        .childAt(3)
        .text()
    ).toBe(copy)
  })

  it('has Support item fifth in list', () => {
    const copy = 'Support'
    const wrapper = shallow(<MobileNav />)
    expect(
      wrapper
        .find('ul')
        .childAt(4)
        .text()
    ).toBe(copy)
  })

  it('has Sign Out item at bottom of list', () => {
    const copy = 'Sign Out'
    const wrapper = mount(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    )
    expect(
      wrapper
        //combinator added to accommodate
        //temporary Sign Out button link
        .find('.sign-out-button')
        // .childAt(5)
        .text()
    ).toBe(copy)
  })
})
