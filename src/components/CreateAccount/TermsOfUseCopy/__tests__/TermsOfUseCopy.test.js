import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Link } from 'react-router-dom'
import {
  TermsOfUseCopy1,
  TermsOfUseCopy2,
  TermsOfUseCopy3
} from '../TermsOfUseCopy'

describe('Terms of Use components', () => {
  it('displays the first Terms of Use component', () => {
    const wrapper = shallow(<TermsOfUseCopy1 />)
    expect(wrapper.find('.terms-of-use__copy')).toHaveLength(2)
    expect(wrapper.find('.next-button')).toHaveLength(1)
  })

  it('displays the second Terms of Use component', () => {
    const container = mount(
      <MemoryRouter>
        <TermsOfUseCopy2 />
      </MemoryRouter>
    )
    expect(container.find('[href="/account/create/3"]')).toHaveLength(1)
    expect(container.find('.terms-of-use__copy')).toHaveLength(1)
    expect(container.find('.next-button')).toHaveLength(1)
  })

  it('displays the third Terms of Use component', () => {
    const container = mount(
      <MemoryRouter>
        <TermsOfUseCopy3 />
      </MemoryRouter>
    )
    expect(container.find('[href="/account/create/4"]')).toHaveLength(1)
    expect(container.find('.terms-of-use__copy')).toHaveLength(3)
    expect(container.find('.i-agree-button')).toHaveLength(1)
  })
})
