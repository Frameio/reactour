import React from 'react'
import styled from 'styled-components'

const PointerSVG = props => (
  <svg viewBox="0 0 9 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fill-rule="evenodd">
      <path
        d="M9 24v-2.58a3 3 0 0 0-1.098-2.32l-5.83-4.78a3 3 0 0 1 0-4.64l5.83-4.78A3 3 0 0 0 9 2.58V0v24z"
        fill="#FFF"
        fill-rule="nonzero"
      />
      <path
        d="M9 24v-2.58a3 3 0 0 0-1.098-2.32l-5.83-4.78a3 3 0 0 1 0-4.64l5.83-4.78A3 3 0 0 0 9 2.58V0v24z"
        fill="#FFF"
      />
    </g>
  </svg>
)

const Pointer = styled(PointerSVG)`
  width: 9px;
  height: 24px;
`

export default Pointer
