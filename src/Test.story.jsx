import React from 'react'
module.exports = ({ storiesOf, action }) => {
  return storiesOf('General/Test', module)
    .add('default', () => {
      return <div>
        The test
      </div>
    })
}
