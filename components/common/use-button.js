import React from 'react'
import PropTypes from 'prop-types'

export default function useButton({ color }) {
  return (
    <button style={{ backgroundColor: color }}>
      <strong>more</strong>
    </button>
  )
}

useButton.propTypes = {
  color: PropTypes.string,
}
