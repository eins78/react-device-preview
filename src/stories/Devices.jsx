import React from 'react'
import { storiesOf } from '@kadira/storybook'

import DevicePreview from '../../../config/templates/DevicePreview'

const story = storiesOf('DevicePreview', module)

story.add('default options, with text', () => {
  return (
    <figure>
      <DevicePreview>hello world</DevicePreview>
      <figcaption style={{margin: '1em'}}>
        <code>
          {`<DevicePreview>hello world</DevicePreview>`}
        </code>
      </figcaption>
    </figure>
  )
})

story.add('default options, with iframe content', () => {
  return (
    <figure>
      <DevicePreview>
        <iframe seamless src='//example.com' style={{height: '100%', width: '100%'}}/>
      </DevicePreview>
      <figcaption style={{margin: '1em'}}>
        <code>
          {`<DevicePreview>
            <iframe seamless src='//example.com' style={{height: '100%', width: '100%'}}/>
          </DevicePreview>`}
        </code>
      </figcaption>
    </figure>
  )
})

DevicePreview.deviceConfigurations.forEach((device) => {
  story.add(device.name, () => (
    <div style={{textAlign: 'center', background: 'lightgrey'}}>
      <h1>{device.name}</h1>
      {device.orientations.map((orientation) => (
        device.colors.map((color) => {
          const deviceProps = {
            name: device.key,
            color: color,
            orientation: orientation }

          return (<section key={JSON.stringify(deviceProps)}>
            <figure>
              <DevicePreview {...deviceProps}>
                hello world
              </DevicePreview>
              <figcaption style={{margin: '1em'}}>
                <code>
                  {buildExampleCode(device, deviceProps, 'key')}
                </code>
                <br/>
                <code>
                  {buildExampleCode(device, deviceProps, 'name')}
                </code>
              </figcaption>
            </figure>
            <hr style={{'margin': '3em'}}/>
          </section>)
        })
      ))}
    </div>
  ))
})

function buildExampleCode (device, props, key) {
  // use color always when there is more than 1 option
  const showColor = (device.colors.length > 1)
  // show orientation only if needed (more than 1 and not default)
  const showOrientation = ((device.orientations.length > 1) &&
    (device.orientations[0] !== props.orientation))

  return `<Device name="${device[key]}"` +
    (!showColor ? ''
      : ` color="${props.color}"`) +
    (!showOrientation ? ''
      : ` orientation="${props.orientation}"`) +
    `>hello world</Device>`
}
