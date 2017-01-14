import React, { Component } from 'react'
import {
  TouchableOpacity,
  Modal,
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native'
import _ from 'lodash'

import View from './View'
import Icon from './Icon'
import {Text} from './Texts'
import WithThemeHOC from './withThemeHOC'
const window = Dimensions.get('window')

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      optionHeight: 0,
      collapsed: false
    }

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  static propTypes = {
    theme: React.PropTypes.object,
    style: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array
    ])
  }

  static defaultProps = {}

  getSelectedOption = () => {
    const { options, selectedOption } = this.props
    if (_.indexOf(options, selectedOption) === -1) {
      console.warn(
        `Invalid \`selectedOption\` ${JSON.stringify(selectedOption)}, ` +
        'DropDown `selectedOption` must be a member of `options`.' +
        'Check that you are using the same reference in both `options`' +
        'and `selectedOption`.'
      )
      return
    }
    return selectedOption
  }

  collapse = (state) => {
    this.setState({ collapsed: state })
  }

  renderSelectedOption = () => {
    const { titleProperty } = this.props
    const selectedOption = this.getSelectedOption()
    return selectedOption ? (
      <View style={styles.horizontalContainer}>
        <TouchableOpacity
          onPress={() => this.collapse(true)}
          style={styles.selectedOption}
        >
          <Text>{selectedOption[titleProperty]}</Text>
          <Icon
            size={15}
            name='expand-more'
          />
        </TouchableOpacity>
      </View>
    ) : null
  }

  selectOption = (option) => {
    const { selectedOption } = this.props
    this.collapse(false)

    option !== selectedOption &&
    this.emitOnOptionSelectedEvent(option)
  }

  emitOnOptionSelectedEvent = (option) => {
    const { onOptionSelected } = this.props
    onOptionSelected && onOptionSelected(option)
  }

  renderRow = (option) => {
    const { titleProperty } = this.props
    return (
      <TouchableOpacity onPress={() => this.selectOption(option)} >
        <Text style={styles.text}>
          {option[titleProperty].toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
  }

  containerStyle = () => {
    const { style } = this.props
    const defaultStyles = {}
    return [defaultStyles, style]
  }

  render () {
    const { collapsed } = this.state
    const { titleProperty, options } = this.props

    const button = this.renderSelectedOption()
    if (_.size(options) === 0 || !button) {
      return null
    }

    const dataSource = this.ds.cloneWithRows(
      options.filter(
        (option) => option[titleProperty]
      )
    )

    return (
      <View
        style={this.containerStyle()}
        ref={component => (this._root = component)} >
        {button}
        <Modal
          visible={collapsed}
          onRequestClose={this.close}
          transparent
        >
          <View style={styles.model}>
            <ListView
              dataSource={dataSource}
              renderRow={this.renderRow}
            />
            <TouchableOpacity
              onPress={() => this.collapse(false)}
              style={styles.closeContainer}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  model: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(242, 242, 242, 0.97)'
  },
  text: {
    textAlign: 'center',
    flex: 1,
    width: window.width,
    paddingHorizontal: 20,
    paddingVertical: 23,
    alignSelf: 'stretch'
  },
  selectedOption: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  closeContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0
  }
})

export default WithThemeHOC(Dropdown)
