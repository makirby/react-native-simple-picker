import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Picker,
  Dimensions
} from 'react-native'

const Item = Picker.Item
const SCREEN_WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F5FCFF'
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bottomPicker: {
    width: SCREEN_WIDTH
  }
})

type Option = {
  data?: any;
  value: number | string;
  label: string;
}

type Props = {
  buttonColor: string,
  options: Array<Option>;
  confirmText: string;
  cancelText: string;
  itemStyle: Object;
  onSubmit: (value: any) => void;
}

class SimplePicker extends Component {
  props: Props;
  constructor (props: Props) {
    super(props)

    this.state = {
      items: props.options,
      buttonColor: props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedIndex: 0
    }
  }

  componentWillReceiveProps (props: Props, nextProps: Props) {
    // If options are changing, and our current selected option is not part of
    // the new options, update it.
    if (
      props.options &&
      props.options.length > 0
    ) {
      this.setState({
        selectedIndex: 0
      })
    }
  }

  onPressCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  onPressSubmit = () => {
    const item = this.state.items[this.state.selectedIndex]
    this.props.onSubmit && this.props.onSubmit(item.data || item.value)
    this.setState({
      modalVisible: false
    })
  }

  onValueChange = (itemValue: string, itemPosition: number) => {
    this.setState({
      selectedIndex: itemPosition
    })
  }

  show () {
    this.setState({
      modalVisible: true
    })
  }

  renderItem = (option: Option, index: number) => {
    const {label, value} = option
    return (
      <Item
        key={value}
        value={value}
        label={label}/>
    )
  }

  render () {
    const { buttonColor } = this.state
    const itemStyle = this.props.itemStyle || {}
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalVisible}>
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={{ color: buttonColor }}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={{ color: buttonColor }}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <Picker
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={this.props.options[this.state.selectedIndex].value}
                onValueChange={this.onValueChange}
                itemStyle={itemStyle}>
                {this.props.options.map((option, index) => this.renderItem(option, index))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default SimplePicker
