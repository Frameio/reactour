import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import * as hx from '../../helpers'

import Beacon from './Beacon'
import Pointer from './Pointer'

const enter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const leave = keyframes`
  0% {
    opacity: 1;
  }

  99% {
    opacity: 0;
  }

  100% {
    opacity: 0;
    z-index: -1;
  }
`

const float = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
`

const getPositioning = position => {
  switch (position) {
    case 'top': {
      return css`
        transform: rotate(-90deg);
        left: -20px;
        bottom: -64px;
      `
    }
    case 'right': {
      return css`
        transform: rotate(0deg);
        left: -64px;
        bottom: -10px;
      `
    }
    case 'bottom': {
      return css`
        transform: rotate(90deg);
        left: -20px;
        top: -64px;
      `
    }
    case 'left': {
      return css`
        transform: rotate(180deg);
        right: -64px;
        bottom: -10px;
      `
    }
    default: {
      return css``
    }
  }
}

const Guide = styled.div`
  position: fixed;
  transition: top 0.3s, left 0.3s;
  opacity: 0;
  left: ${({ coordinates }) => coordinates[0]}px;
  top: ${({ coordinates }) => coordinates[1]}px;
  animation: ${({ isOpen }) => (isOpen ? enter : leave)} 0.3s ease-in-out;
  animation-delay: ${({ isOpen }) => (isOpen ? 0.5 : 0)}s
  animation-fill-mode: forwards;
  z-index: 1000000;
`

const Content = styled.div`
  --reactour-accent: ${props => props.accentColor};
  background-color: #fff;
  border: 1px solid #fff;
  padding: 24px;
  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);
  color: inherit;
  max-width: 320px;
  min-width: 150px;
  outline: 0;
  border-radius: ${props => props.rounded}px;
  animation: ${float} 4s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
`

const BeaconContainer = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  ${({ position }) => getPositioning(position)};
`

export default class extends React.Component {
  getPositioning = () => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = this.props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = coords => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return {
            coordinates: coords[positionsOrder[j]],
            position: positionsOrder[j],
          }
        }
      }
      return {
        coordinates: coords.center,
        position: 'center',
      }
    }

    const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
      ? hx.isOutsideX(targetRight + padding, windowWidth)
        ? targetRight - helperWidth
        : targetRight - helperWidth + padding
      : targetLeft - padding
    const x = hX > padding ? hX : padding
    const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
      ? hx.isOutsideY(targetBottom + padding, windowHeight)
        ? targetBottom - helperHeight
        : targetBottom - helperHeight + padding
      : targetTop - padding
    const y = hY > padding ? hY : padding
    const coords = {
      top: [x, targetTop - helperHeight - padding * 2],
      right: [targetRight + padding * 2, y],
      bottom: [x, targetBottom + padding * 2],
      left: [targetLeft - helperWidth - padding * 2, y],
      center: [
        windowWidth / 2 - helperWidth / 2,
        windowHeight / 2 - helperHeight / 2,
      ],
    }

    if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
      return {
        coordinates: coords[helperPosition],
        position: helperPosition,
      }
    }

    return autoPosition(coords)
  }

  render() {
    const {
      children,
      hideBeacon,
      hideContent,
      isOpen,
      innerRef,
      ...rest
    } = this.props
    const { coordinates, position } = this.getPositioning()

    return (
      <Guide innerRef={innerRef} coordinates={coordinates} isOpen={isOpen}>
        {!hideContent && <Content {...rest}>{children}</Content>}
        {!hideBeacon && (
          <BeaconContainer position={position}>
            <Beacon hide={hideBeacon} />
          </BeaconContainer>
        )}
      </Guide>
    )
  }
}
