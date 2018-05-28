import React from 'react'
import { shallow } from 'enzyme'

import { AddIcon } from '../AddIcon'

describe('Add icon component', () => {
  it('renders with shape', () => {
    const shape =
      'M992 384h-352v-352c0-17.672-14.328-32-32-32h-192c-17.672 0-32 14.328-32 32v352h-352c-17.672 0-32 14.328-32 32v192c0 17.672 14.328 32 32 32h352v352c0 17.672 14.328 32 32 32h192c17.672 0 32-14.328 32-32v-352h352c17.672 0 32-14.328 32-32v-192c0-17.672-14.328-32-32-32z'
    const wrapper = shallow(<AddIcon />)
    expect(wrapper.find('path').prop('d')).toBe(shape)
  })
})
