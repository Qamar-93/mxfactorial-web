import React from 'react'
import { shallow } from 'enzyme'

import { HomeIcon } from '../HomeIcon'

describe('Home icon component', () => {
  it('renders with shape', () => {
    const shape =
      'M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z'
    const wrapper = shallow(<HomeIcon />)
    expect(wrapper.find('path').prop('d')).toBe(shape)
  })
})
