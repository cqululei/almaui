import React, { Component, PropTypes, Children } from 'react'

class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  // you must specify what you’re adding to the context
  static childContextTypes = {
    theme: PropTypes.object.isRequired
  }

  getChildContext () {
    const { theme } = this.props
    return { theme }
  }

  render () {
    return Children.only(this.props.children)
  }
}
export default ThemeProvider
