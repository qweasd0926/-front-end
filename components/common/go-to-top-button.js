import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { FaAnglesUp } from 'react-icons/fa6'

export default function goToTopButton({
  padding,
  borderRadius,
  backgroundColor,
  color,
  position,
  right,
  bottom,
  zIndex,
  animation,
}) {
  return (
    <Link
      href="#top"
      className="btn"
      style={{
        padding,
        borderRadius,
        backgroundColor,
        color,
        position,
        right,
        bottom,
        zIndex,
        animation,
      }}
    >
      <FaAnglesUp style={{ fontSize: '40px' }} />
    </Link>
  )
}

goToTopButton.propTypes = {
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  zIndex: PropTypes.string,
  animation: PropTypes.string,
}
