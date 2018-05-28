import React from 'react'
import PropTypes from 'prop-types'

const HomeIcon = () => (
  <svg className="home-icon" width={28} height={28} viewBox="0 0 1024 1024">
    <path d="M1024 590.444l-512-397.426-512 397.428v-162.038l512-397.426 512 397.428zM896 576v384h-256v-256h-256v256h-256v-384l384-288z" />
  </svg>
)

HomeIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export { HomeIcon }
