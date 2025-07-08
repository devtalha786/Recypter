import React from 'react'

const CustomLabel = ({text,className}) => {
  return (
    <span className={`text-2xl font-medium px-3 py-1 rounded-lg ${className}` }>{text}</span>

  )
}

export default CustomLabel
