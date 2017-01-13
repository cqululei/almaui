import React, { Component } from 'react'
import _ from 'lodash'
import { View } from 'react-native'

import Row from './Row'
import WithThemeHOC from './withThemeHOC'

class Container extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {}

  getDirection = () => {
    const { children } = this.props
    console.log(children)
    let row = false

    _.forEach(children, (child) => {
      child.type && child.type === Row && (row = true)
    })

    return row
  }

  constainerStyle = () => {
    const { style } = this.props
    const defaultStyles = {
      flex: 1,
      flexDirection: this.getDirection() ? 'column' : 'row'
    }
    return [
      defaultStyles,
      style]
  }

  render () {
    return (
      <View
        {...this.props}
        style={this.constainerStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

export default WithThemeHOC(Container)
