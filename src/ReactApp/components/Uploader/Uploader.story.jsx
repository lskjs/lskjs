import Uploader from './Uploader'


module.exports = function ({ storiesOf, action }) {
  return storiesOf('Editor', module)
    .add('Uploader 1', () => (
      <Uploader
        target='https://img2.mgbeta.ru/upload'
        dir="mg/prj1"
        onSuccess={action('onSuccess')}
      />
      // {/*<Uploader
      //   link="http://vk.com"
      //   image='//cdn.mgbeta.ru/inessa/iq/1.jpg'
      //   title='Окружающий мир'
      //   subtitle='Братья наши меньшие'
      //   />*/}
    ))
}
