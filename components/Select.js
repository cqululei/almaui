import React, { Component } from 'react'
import View from './View'
import WithThemeHOC from './withThemeHOC'

class Select extends Component {

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {}

  computeStyle = () => {
    const { style } = this.props
    const defaultStyles = {}
    return [defaultStyles, style]
  }

  render () {
    return (
      <View
        style={this.computeStyle()}
        ref={component => (this._root = component)} >
        {this.props.children}
      </View>
    )
  }

}

export default WithThemeHOC(Select)
