import React from 'react'

export default function input({type, value, name, onChange, style}) {
  return <input type={type} value={value} name={name} onChange={onChange} style={style} />
}
