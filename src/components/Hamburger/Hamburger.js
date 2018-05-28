import React from 'react'
import PropTypes from 'prop-types'
import './Hamburger.css'
import './hamburgers.css'

const Hamburger = props => (
  <div className="circle">
    <button
      className={
        'hamburger hamburger--3dx hamburger-position' +
        (props.menuIsActive ? ' is-active' : '')
      }
      type="button"
      onClick={props.handleNav}
      stuff={props.hi}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  </div>
)

Hamburger.propTypes = {
  onClick: PropTypes.func
}

export { Hamburger }
