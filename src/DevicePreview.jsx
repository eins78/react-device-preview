const React = require('react')
const PropTypes = React.PropTypes
const cx = require('classnames/dedupe')
const {extend, find, includes} = require('lodash')

// inject CSS (webpack!)
require('../node_modules/Devices.css/assets/devices.min.css')

// all possible configs, per device/options
const DEVICES = [
  { name: 'iPhone 6',
    key: 'iphone6',
    colors: ['black', 'silver', 'gold'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'iPhone 6 Plus',
    key: 'iphone6plus',
    colors: ['black', 'silver', 'gold'],
    orientations: ['portrait', 'landscape']},
  { name: 'iPhone 5S',
    key: 'iphone5s',
    colors: ['black', 'silver', 'gold'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'iPhone 5C',
    key: 'iphone5c',
    colors: ['white', 'red', 'yellow', 'green', 'blue'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'iPad Mini',
    key: 'ipad',
    colors: ['black', 'silver'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'iPhone 4S',
    key: 'iphone4s',
    colors: ['black', 'white'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'Nexus 5',
    key: 'nexus5',
    colors: ['black'], // NOTE: not needed as class but allowed
    orientations: ['portrait', 'landscape']
  },
  { name: 'Lumia 920',
    key: 'lumia920',
    colors: ['black', 'white', 'yellow', 'red', 'blue'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'Samsung Galaxy S5',
    key: 's5',
    colors: ['white', 'black'],
    orientations: ['portrait', 'landscape']
  },
  { name: 'HTC One',
    key: 'htc-one',
    colors: ['silver'], // NOTE: not needed as class but allowed
    orientations: ['portrait', 'landscape']
  },
  { name: 'MacBook Pro',
    key: 'macbook',
    colors: ['silver'], // NOTE: not needed as class but allowed
    orientations: ['landscape']
  }
]

function getDeviceByNameOrKey (nameOrKey) {
  return (find(DEVICES, {key: nameOrKey}) ||
          find(DEVICES, {name: nameOrKey}))
}

function validateDeviceProps (props, propName, componentName) {
  const error = (message) => (
    new Error('Invalid prop `' + propName + '=' + props[propName] +
      '` supplied to' + ' `' + componentName + '`. ' + message))

  // find device by 'name' prop, which allows device name or device key
  const device = getDeviceByNameOrKey(props.name)

  // NOTE: only need to check for valid device once!
  //       check on name' prop, silently ignore for all others

  // validate `name` prop:
  if (propName === 'name' && !device) {
    return error(`Device "${props.name}" not found!`)
  }

  // validate `color` prop:
  if (propName === 'color' && device && props.color) {
    if (device && !includes(device.colors, props.color)) {
      return error(`For "${device.name}", must be one of: ` +
        device.colors.join(', '))
    }
  }

  // validate `orientation` prop:
  if (propName === 'orientation' && props.orientation) {
    if (device && !includes(device.orientations, props.orientation)) {
      return error(`For "${device.name}", must be one of: ` +
        device.orientations.join(', '))
    }
  }
}

module.exports = React.createClass({
  displayName: 'DevicePreview',
  propTypes: {
    children: PropTypes.node.isRequired,
    className: PropTypes.oneOfType([
      PropTypes.string, PropTypes.objectOf(PropTypes.bool)
    ]),
    // device props:
    name: validateDeviceProps,
    orientation: validateDeviceProps,
    color: validateDeviceProps
  },
  getDefaultProps () {
    return {
      name: 'iphone4s',
      color: 'black',
      orientation: 'portrait'
    }
  },

  // export list of devices on component:
  statics: {
    deviceConfigurations: DEVICES
  },

  render (props = this.props) {
    const overrideScreenStyles = { color: 'initial', textAlign: 'initial' }
    const screenStyles = extend(overrideScreenStyles, { overflow: 'hidden' })
    const exampleBodyStyles = {
      background: 'white', height: '100%', boxSizing: 'initial'}

    const device = getDeviceByNameOrKey(props.name)

    const wrapperClasses = cx(
      props.className,
      'marvel-device',
      device.key,
      (props.color || device.colors[0]),
      {landscape: (props.orientation === 'landscape')})

    return (
      <div className={wrapperClasses}>
          <div className='top-bar'></div>
          <div className='sleep'></div>
          <div className='volume'></div>
          <div className='camera'></div>
          <div className='sensor'></div>
          <div className='speaker'></div>
          <div className='screen' style={screenStyles}>
            <div className='example-body' style={exampleBodyStyles}>
              {props.children}
            </div>
          </div>
          <div className='home'></div>
          <div className='bottom-bar'></div>
      </div>
    )
  }
})
