import React from 'react'
module.exports = ({ storiesOf, action }) => {
  return storiesOf('General/Test', module)
    .add('test1', () => {
      return <div>
        The test 1
      </div>
    })
    .add('test 2', () => {
      return <div>
        The test 2
      </div>
    })
}
