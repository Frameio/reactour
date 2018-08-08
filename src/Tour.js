import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ExecutionEnvironment from 'exenv'
import TourPortal from './TourPortal'

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer
const SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {}

function getParentElement(parentSelector) {
  return parentSelector()
}

class Tour extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    portalClassName: PropTypes.string,
    appElement: PropTypes.instanceOf(SafeHTMLElement),
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    closeWithMask: PropTypes.bool,
    parentSelector: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
    portalClassName: 'reactour-portal',
    closeWithMask: true,
    parentSelector() {
      return document.body
    },
  }

  componentDidMount() {
    this.renderPortal(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount() {
    this.removePortal()
  }

  renderPortal(props) {
    if (props.isOpen) {
      document.body.classList.add('reactour__body')
    } else {
      document.body.classList.remove('reactour__body')
    }
  }

  removePortal() {
    document.body.classList.remove('reactour__body')
  }

  render() {
    const { portalClassName, ...rest } = this.props

    return ReactDOM.createPortal(
      <TourPortal className={portalClassName} {...rest} />,
      this.props.parentSelector()
    )
  }
}

export default Tour
