import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'

import WithThemeHOC from './withThemeHOC'

class Spinner extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  render () {
    const { style = {} } = this.props
    const { color = 'grey', size = 'small' } = style
    style.color && (delete style.color)
    style.size && (delete style.size)

    return (
      <ActivityIndicator
        animating
        {...this.props}
        color={color}
        size={size}
        style={style}
        ref={component => (this._root = component)}
      />
    )
  }

}

export default WithThemeHOC(Spinner)
