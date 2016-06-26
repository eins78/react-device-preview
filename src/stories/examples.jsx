import React from 'react'
import { storiesOf } from '@kadira/storybook'

import DevicePreview from '../DevicePreview'

const story = storiesOf('Examples', module)

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
          {`<DevicePreview><iframe seamless src='//example.com'
            style={{height: '100%', width: '100%'}}/></DevicePreview>`}
        </code>
      </figcaption>
    </figure>
  )
})
