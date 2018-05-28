import React from 'react'
import { shallow } from 'enzyme'

import { DisableScreen } from '../DisableScreen'

describe('Disable Screen component', () => {
  it('renders', () => {
    const wrapper = shallow(<DisableScreen />)
    expect(wrapper.find('.disable-screen')).toHaveLength(1)
  })
})
