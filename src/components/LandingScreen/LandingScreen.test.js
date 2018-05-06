import React from 'react'
import { shallow } from 'enzyme'

import LandingScreen from './LandingScreen'

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
})
