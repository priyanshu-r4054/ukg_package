import React from 'react'
import './Style.css'
export default function Circle({text}) {
  return (
<div className="node-container">
  <div className="node-circle default-node-color">
    <div className="node-text" title={text}>
      {text}
      </div>
  </div>
</div>
  )
}
