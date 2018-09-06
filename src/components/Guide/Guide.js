import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import * as hx from '../../helpers'

import Beacon from './Beacon'
import Pointer from './Pointer'

const enter = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }

  1% {
    opacity: 0;
    transform: scale(1.25);
  }

  100% {
    opacity: 1;
    transform: scale(1);
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

const getPositioning = position => {
  switch (position) {
    case 'top': {
      return css`
        transform: rotate(-90deg);
        left: 0;
        bottom: -29px;
      `
    }
    case 'right': {
      return css`
        transform: rotate(0deg);
        left: -34px;
        bottom: 8px;
      `
    }
    case 'bottom': {
      return css`
        transform: rotate(90deg);
        left: 0;
        top: -29px;
      `
    }
    case 'left': {
      return css`
        transform: rotate(180deg);
        right: -34px;
        bottom: 8px;
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
  animation: ${({ isOpen }) => (isOpen ? enter : leave)}
  animation-duration: 0.5s;
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
