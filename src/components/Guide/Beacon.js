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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="71px"
    height="71px"
    viewBox="0 0 71 71"
    version="1.1"
    {...props}
  >
    <defs>
      <circle id="path-1" cx="49.5" cy="81.5" r="21.5" />
      <filter
        x="-59.3%"
        y="-59.3%"
        width="218.6%"
        height="218.6%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feMorphology
          radius="3"
          operator="dilate"
          in="SourceAlpha"
          result="shadowSpreadOuter1"
        />
        <feOffset
          dx="0"
          dy="0"
          in="shadowSpreadOuter1"
          result="shadowOffsetOuter1"
        />
        <feMorphology
          radius="4"
          operator="erode"
          in="SourceAlpha"
          result="shadowInner"
        />
        <feOffset dx="0" dy="0" in="shadowInner" result="shadowInner" />
        <feComposite
          in="shadowOffsetOuter1"
          in2="shadowInner"
          operator="out"
          result="shadowOffsetOuter1"
        />
        <feGaussianBlur
          stdDeviation="5.5"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0.356862745   0 0 0 0 0.325490196   0 0 0 0 1  0 0 0 1 0"
          type="matrix"
          in="shadowBlurOuter1"
        />
      </filter>
      <filter
        x="-47.7%"
        y="-47.7%"
        width="195.3%"
        height="195.3%"
        filterUnits="objectBoundingBox"
        id="filter-3"
      >
        <feMorphology
          radius="2"
          operator="erode"
          in="SourceAlpha"
          result="shadowSpreadInner1"
        />
        <feGaussianBlur
          stdDeviation="2.5"
          in="shadowSpreadInner1"
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
      id="Player-Onboarding"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      opacity="0.703236607"
    >
      <g id="Artboard" transform="translate(-14.000000, -46.000000)">
        <g id="Oval-5">
          <use
            fill="black"
            fillOpacity="1"
            filter="url(#filter-2)"
            xlinkHref="#path-1"
          />
          <use
            fill="black"
            fillOpacity="1"
            filter="url(#filter-3)"
            xlinkHref="#path-1"
          />
          <circle
            strokeOpacity="0"
            stroke="#5B53FF"
            strokeWidth="1"
            strokeLinejoin="square"
            cx="49.5"
            cy="81.5"
            r="21"
          />
        </g>
      </g>
    </g>
  </svg>
)

const FirstPulse = styled(BeaconSVG)`
  position: absolute;
  width: 32px;
  height: 32px;
  animation: ${scaleFade} 2s infinite;
`

const SecondPulse = FirstPulse.extend`
  animation-delay: 0.7s;
`

const Container = styled.div`
  position: relative;
  opacity: ${props => (!props.hide ? 1 : 0)};
  right: 11px;
  bottom: 3px;
  height: 32px;
  width: 32px;
`

const Beacon = props => (
  <Container {...props}>
    <FirstPulse />
    <SecondPulse />
  </Container>
)

export default Beacon
