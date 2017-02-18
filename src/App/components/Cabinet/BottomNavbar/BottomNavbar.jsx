import { Component, PropTypes } from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'

@inject('user')
@observer
export default class BottomNavbar extends Component {
  static contextTypes = {
    history: PropTypes.func,
  }
  constructor() {
    super()
    this.state = {
      timer: 0
    }
  }
  componentDidMount() {
    this.timerId = setInterval(this.recount, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  @autobind
  recount() {
    const taskPack = this.props.user.getActiveTask()
    if (taskPack) {
      const diff = (Date.now() - (new Date(taskPack.utask.startedAt)))
      this.setState({timer: diff})
    }
  }
  @autobind
  handleFinishTask() {
    const taskPack = this.props.user.getActiveTask()
    if (taskPack) {
      this.props.user.finishTask({
        courseId: taskPack.course._id,
        taskIndex: taskPack.task.index,
      })
      .then(() => {
        window.location = '/success'
      })
      .catch(() => {
        window.location = '/success'
      })
    }
  }
  render() {
    const taskPack = this.props.user.getActiveTask()
    if(!taskPack) return null
    const task = taskPack.task
    const utask = taskPack.utask
    let timer = '?'
    if (task) {
      let diff = this.state.timer
      diff = diff / 1000
      const sec = Math.floor(diff % 60);
      diff = diff / 60
      const min = Math.floor(diff % 60)
      diff = diff / 60
      const h = Math.floor(diff % 60)

      timer = `${h} часов ${min} минут ${sec} секунд`
    }
    return (
      <div>
        <If condition={task}>
          <section className="footer">
            <div className="f-title">{task.title}</div>
            <div className="f-time">
              <div className="ft-head">Прогнозируемое время</div>
              <div className="ft-text">{utask.estimate} часов</div>
            </div>
            <div className="f-time">
              <div className="ft-head">Затраченное время</div>
              <div className="ft-text">{timer}</div>
            </div>
            {/* <a href={this.props.user.getTaskLink(taskPack)}> */}
              <button  onClick={this.handleFinishTask} className="f-button">Сдать задание</button>
            {/* </a> */}
          </section>
        </If>
      </div>
    );
  }
}
