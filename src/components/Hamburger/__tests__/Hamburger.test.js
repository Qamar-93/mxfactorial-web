import React from 'react'
import { shallow, mount } from 'enzyme'

import { Hamburger } from '../Hamburger'

describe('Hamburger Icon component', () => {
  it('renders', () => {
    const wrapper = shallow(<Hamburger />)
    expect(wrapper.find('.hamburger')).toHaveLength(1)
  })

  it('onclick event triggered', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Hamburger />).setProps({ handleNav: mockFn })
    expect(mockFn).not.toHaveBeenCalled()
    expect(wrapper.find('button')).toHaveLength(1)
    wrapper.find('button').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })

  it('active state displays', () => {
    const isActive = 'is-active'
    const wrapper = shallow(<Hamburger menuIsActive={true} />)
    expect(wrapper.find('button').hasClass(isActive)).toBe(true)
  })
})
