import React, { Component } from 'react'
import _ from 'lodash'
import {
  View,
  ListView,
  RefreshControl,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native'

import { Theme } from '../theme'
import Spinner from './Spinner'
import mergeStyles from '../utils/mergeStyles'
import stringToArray from '../utils/stringToArray'
import WithThemeHOC from './withThemeHOC'

const scrollViewProps = _.keys(ScrollView.propTypes)
const Status = {
  LOADING: 'loading',
  LOADING_NEXT: 'loadingNext',
  REFRESHING: 'refreshing',
  IDLE: 'idle'
}

class ListDataSource {
  constructor (config, getSectionId) {
    this.getSectionId = getSectionId
    this.withSections = !!config.sectionHeaderHasChanged
    this.dataSource = new ListView.DataSource(config)
  }

  groupItemsIntoSections (data) {
    let prevSectionId
    return data.reduce((sections, item) => {
      const sectionId = this.getSectionId(item)
      if (prevSectionId !== sectionId) {
        prevSectionId = sectionId
        sections.push([])
      }
      const lastSectionIndex = sections.length - 1
      sections[lastSectionIndex].push(item)
      return sections
    }, [])
  }

  /**
   * Transforms items list [<item>, <item>]
   * @param data
   * @returns {*}
   */
  clone (data) {
    if (this.withSections) {
      return this.dataSource.cloneWithRowsAndSections(
        this.groupItemsIntoSections(data)
      )
    }
    return this.dataSource.cloneWithRows(data)
  }
}

class CustomListView extends Component {
  constructor (props) {
    super(props)

    this.listDataSource = new ListDataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: props.renderSectionHeader
        ? (s1, s2) => s1 !== s2
        : undefined,
      getSectionHeaderData: (dataBlob, sectionId) => {
        props.getSectionId(dataBlob[sectionId][0])
      }
    }, props.getSectionId)

    this.state = {
      status: props.loading ? Status.LOADING : Status.IDLE,
      dataSource: this.listDataSource.clone(props.data)
    }
  }

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ]),
    autoHideHeader: React.PropTypes.bool,
    data: React.PropTypes.array,
    loading: React.PropTypes.bool,
    onLoadMore: React.PropTypes.func,
    onRefresh: React.PropTypes.func,
    getSectionId: React.PropTypes.func,
    // renderRow: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderSectionHeader: React.PropTypes.func,
    scrollDriver: React.PropTypes.object
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.listDataSource.clone(nextProps.data)
      })
    }

    if (nextProps.loading !== this.props.loading) {
      this.setLoading(nextProps.loading)
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (nextProps.data !== this.props.data) ||
      (nextProps.loading !== this.props.loading) ||
      (nextState.status !== this.state.status)
  }

  componentWillUnmount = () => {
    if ((Platform.OS === 'ios') && (this.state.status !== Status.IDLE)) {
      // Reset the global network indicator state
      StatusBar.setNetworkActivityIndicatorVisible(false)
    }
  }

  onRefresh = () => {
    this.setState({
      status: Status.REFRESHING
    })

    if (this.props.onRefresh) {
      this.props.onRefresh()
    }
  }

  setLoading (loading) {
    if (loading) {
      if (this.state.status !== Status.IDLE) {
        // We are already in a loading status
        return
      }

      this.setState({
        status: Status.LOADING
      })
    } else {
      this.setState({
        status: Status.IDLE
      })
    }
  }

  autoHideHeader ({ nativeEvent: { layout: { height } } }) {
    this.scrollListView({ y: height, animated: false })
  }

  createRenderHeader (renderHeader, autoHideHeader) {
    const headerProps = {}
    if (!renderHeader) {
      return
    }

    if (autoHideHeader) {
      headerProps.onLayout = this.autoHideHeader
    }

    return () => (
      <View {...headerProps}>{renderHeader()}</View>
    )
  }

  renderFooter () {
    const { style, renderFooter } = this.props
    const { status } = this.state
    let spinner

    let showNetworkActivity = true
    switch (status) {
      case Status.LOADING:
        spinner = <View style={style.loadMoreSpinner}><Spinner /></View>
        break
      case Status.LOADING_NEXT:
        spinner = <View style={style.loadMoreSpinner}><Spinner /></View>
        break
      case Status.REFRESHING:
        spinner = null
        break
      default:
        showNetworkActivity = false
        spinner = null
    }

    if (Platform.OS === 'ios') {
      StatusBar.setNetworkActivityIndicatorVisible(showNetworkActivity)
    }

    return (
      <View>
        {spinner}
        {renderFooter ? renderFooter() : null}
      </View>
    )
  }

  renderRefreshControl () {
    const { style } = this.props
    const { status } = this.state
    const refreshControlStyle = {
      ...style.refreshControl
    }
    delete refreshControlStyle.tintColor

    return (
      <RefreshControl
        onRefresh={this.onRefresh}
        refreshing={status === Status.REFRESHING}
        tintColor={style.refreshControl.tintColor}
        style={refreshControlStyle}
      />
    )
  }

  scrollListView (scrollOptions) {
    this.listView.scrollTo(scrollOptions)
  }

  createRenderHeader = (renderHeader, autoHideHeader) => {
    const headerProps = {}
    if (!renderHeader) {
      return
    }

    autoHideHeader && (headerProps.onLayout = this.autoHideHeader)
    return () => (
      <View {...headerProps}>{renderHeader()}</View>
    )
  }

  loadMoreContent = () => {
    const { onLoadMore, data } = this.props
    const { status } = this.state
    if (onLoadMore) {
      return _.throttle(() => {
        if (!_.isEmpty(data) && status === Status.IDLE) {
          onLoadMore()
        }
      }, 2000, { leading: true })
    }
  }

  getComputedProps = () => {
    const props = this.props
    const { dataSource } = this.state
    const {
      style,
      contentStyle,
      renderHeader,
      autoHideHeader,
      renderRow,
      renderFooter,
      renderSectionHeader,
      onRefresh
    } = this.props
    const newProps = _.omit(_.pick(props, scrollViewProps), ['style'])

    newProps.onEndReachedThreshold = 40
    newProps.enableEmptySections = true

    // Style
    newProps.style = style
    newProps.contentContainerStyle = contentStyle

    // Render data
    newProps.renderHeader = this.createRenderHeader(
      renderHeader, autoHideHeader
    )
    newProps.renderRow = renderRow
    newProps.renderFooter = renderFooter
    newProps.renderSectionHeader = renderSectionHeader

    // Event
    newProps.onEndReached = this.loadMoreContent()

    newProps.dataSource = dataSource
    newProps.refreshControl = onRefresh && this.renderRefreshControl()

    return newProps
  }

  containerStyle = () => {
    const { style, styleName } = this.props
    const listOfStyleNames = styleName && stringToArray(styleName)
    const computedStyle = listOfStyleNames &&
      mergeStyles(styles, listOfStyleNames) ||
      {}

    return [
      styles.container,
      computedStyle,
      style
    ]
  }
  render () {
    return (
      <ListView
        {...this.getComputedProps()}
        style={this.containerStyle()}
        ref={component => (this._root = component)}
      />
    )
  }

}

var styles = {
  refreshControl: {
    tintColor: Theme.steel
  },
  loadMoreSpinner: {
    paddingVertical: Theme.mediumGutter
  },
  listContent: {
    paddingBottom: Theme.smallGutter
  }
}

export default WithThemeHOC(CustomListView)
