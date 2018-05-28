import React from 'react'
import { shallow } from 'enzyme'

import { SubtractIcon } from '../SubtractIcon'

describe('Subtract icon component', () => {
  it('renders with shape', () => {
    const shape =
      'M0 416v192c0 17.672 14.328 32 32 32h960c17.672 0 32-14.328 32-32v-192c0-17.672-14.328-32-32-32h-960c-17.672 0-32 14.328-32 32z'
    const wrapper = shallow(<SubtractIcon />)
    expect(wrapper.find('path').prop('d')).toBe(shape)
  })
})
