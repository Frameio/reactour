import React from 'react'
import styled, { keyframes } from 'styled-components'

const scaleFade = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }

  90% {
    opacity: 0;
    transform: scale(2.25);
  }

  95% {
    opacity: 0;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const BeaconSVG = props => (
  <svg viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <circle id="path-1" cx="34.5" cy="34.5" r="21.5" />
      <filter
        x="-8.1%"
        y="-8.1%"
        width="116.3%"
        height="116.3%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feGaussianBlur
          stdDeviation="3.5"
          in="SourceAlpha"
          result="shadowBlurInner1"
        />
        <feOffset
          dx="0"
          dy="0"
          in="shadowBlurInner1"
          result="shadowOffsetInner1"
        />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="shadowInnerInner1"
        />
        <feColorMatrix
          values="0 0 0 0 0.356862745   0 0 0 0 0.325490196   0 0 0 0 1  0 0 0 1 0"
          type="matrix"
          in="shadowInnerInner1"
        />
      </filter>
    </defs>
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      fillOpacity="1"
    >
      <g transform="translate(-758.000000, -800.000000)" fill="black">
        <g transform="translate(745.000000, 787.000000)">
          <g>
            <use filter="url(#filter-2)" xlinkHref="#path-1" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const FirstPulse = styled(BeaconSVG)`
  position: absolute;
  width: 24px;
  height: 24px;
  animation: ${scaleFade} 2s infinite;
`

const SecondPulse = FirstPulse.extend`
  position: absolute;
  animation-delay: 0.5s;
`

const Container = styled.div`
  position: relative;
  right: 8px;
  height: 24px;
  width: 24px;
`

const Beacon = props => (
  <Container {...props}>
    <FirstPulse />
    <SecondPulse />
  </Container>
)

export default Beacon
