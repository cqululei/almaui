import React, { Component } from 'react'
import _ from 'lodash'
import { Theme } from '../theme'

const WithThemeHOC = (WrappedComponent) => {
  function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  return class withThemeHOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    static contextTypes = {
      theme: React.PropTypes.object
    }

    render () {
      const theme = this.context.theme
        ? _.merge(Theme, this.context.theme)
        : Theme

      return <WrappedComponent {...this.props} theme={theme} />
    }
  }
}

export default WithThemeHOC
