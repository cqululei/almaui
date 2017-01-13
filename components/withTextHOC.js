import React, { Component } from 'react'

const WithTextHOC = (WrappedComponent) => {
  function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  return class withThemeHOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default WithTextHOC
