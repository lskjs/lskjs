import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { toJS } from 'mobx';
import A from '../A';
import ProfileEditCard from './ProfileEditCard';


export default class ProfileCard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  @autobind
  handleEditClick() {
    this.setState({
      isEdit: true
    })
  }

  renderEdit() {
    const user = this.props.user
    let data = toJS(this.props.user.user2)
    data = _.pick(data, ['info', 'contacts'])
    return <ProfileEditCard
      data={data}
      onSubmit={(data) => {
        console.log('onSubmit', data);
        return this.props.user.updateProfile(data)
        // .then(() => {
        //   window.location = '/cabinet'
        // })
        // throw 'waiting'
      }}
      // onChange={(data) => {
      //   console.log('onChange', data);
      // }}
    />
  }

  render() {
    if (this.state.isEdit) {
      return this.renderEdit()
    }
    // const { username, avatar, rating, code, projects, phone, email, vk, about, skills } = this.props;
    const user = this.props.user
    const userData = user.user2
    const skills = user.info && user.info.skills  && user.info.skills.split(',').map( (skill, id) => {
      return {
        id,
        name: skill,
        progress: 9,
      }
    })
    // [
    //   { id: 1, name: 'Objectiv-C', progress: 9 },
    //   { id: 2, name: 'Java', progress: 9 },
    //   { id: 3, name: 'Android', progress: 9 },
    //   { id: 4, name: 'Nodejs', progress: 9 },
    // ]
    // const info = user.user2.info || {}
    // const contacts = user.user2.contacts || {}
    // const profile = {
    //   username: user.getFullName(),
    //   avatar: user.getPhoto(),
    //   rating: user.getRating(),
    //   code: user.getLinesCode(),
    //   projects: user.getProjectsCount(),
    //   phone: contacts.phone,
    //   email: contacts.email,
    //   vk: contacts.vk,
    //   about: info.bio,
    //   skills: [
    //     { id: 1, name: 'Objectiv-C', progress: 9 },
    //     { id: 2, name: 'Java', progress: 9 },
    //     { id: 3, name: 'Android', progress: 9 },
    //     { id: 4, name: 'Nodejs', progress: 9 },
    //   ],
    // };
    // const post = {
    //   id: 1,
    //   header: {
    //     name: 'Название длинной публикации',
    //     photo: '/front/assets/img/photo.png',
    //   },
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae euismod sapien. Etiam nec velit vitae lectus consectetur finibus. Nunc ac diam id lorem porta vestibulum vel ac ante. Proin ac tortor elementum, tincidunt augue nec, accumsan neque. Fusce ex arcu, pellentesque non magna id, feugiat tincidunt arcu.',
    //   likes: 10,
    // }
    return (
      <div className="card">
        <div className="card-photo" style={{ backgroundImage: `url(${user.getPhoto()})` }}>
          <div className="cp-username">{user.getFullName()}</div>
        </div>
        <div className="card-rating">
          <div className="cr-item">
            <div className="cri-head">Рейтинг</div>
            <div className="cri-val">{user.getRating()}</div>
          </div>
          <div className="cr-item">
            <div className="cri-head">Строк кода</div>
            <div className="cri-val">{user.getLinesCode()}</div>
          </div>
          <div className="cr-item">
            <div className="cri-head">Проектов</div>
            <div className="cri-val">{user.getProjectsCount()}</div>
          </div>
        </div>
        <div className="card-info">
          <If condition={userData.contacts}>
            <If condition={userData.contacts.phone}>
              <div className="ci-item">
                <div className="cii-icon phone"/>
                <div className="cii-info">
                  <div className="cii-info-header">Номер телефона</div>
                  <div className="cii-info-body">{userData.contacts.phone}</div>
                </div>
              </div>
              <div className="separator"/>
            </If>
            <If condition={userData.contacts.email}>
              <div className="ci-item">
                <div className="cii-icon mail"/>
                <div className="cii-info">
                  <div className="cii-info-header">Email</div>
                  <div className="cii-info-body">{userData.contacts.email}</div>
                </div>
              </div>
              <div className="separator"/>
            </If>
            <If condition={userData.contacts.vk}>
              <div className="ci-item">
                <div className="cii-icon vk"/>
                <div className="cii-info">
                  <div className="cii-info-header">Профиль ВКонтакте</div>
                  <div className="cii-info-body">{userData.contacts.vk}</div>
                </div>
              </div>
              <div className="separator"/>
            </If>
            <If condition={userData.contacts.telegram}>
              <div className="ci-item">
                <div className="cii-icon vk"/>
                <div className="cii-info">
                  <div className="cii-info-header">Аккаунт Telegram</div>
                  <div className="cii-info-body">{userData.contacts.telegram}</div>
                </div>
              </div>
              <div className="separator"/>
            </If>
          </If>


          <If condition={userData.info}>
            <If condition={userData.info.about}>
              <div className="ci-item">
                <div className="cii-icon message"/>
                <div className="cii-info">
                  <div className="cii-info-header">О себе</div>
                  <div className="cii-info-body">{userData.info.about}</div>
                </div>
              </div>
              <div className="separator"/>
            </If>
            <If condition={skills && skills.length != 0}>
              <div>
                <div className="ci-item skills">
                  <div className="cii-icon study"/>
                  <div className="cii-info">
                    <div className="cii-info-header">Навыки</div>
                    <div className="cii-info-body">
                      {skills && skills.map((skill, idx) => (
                        <span key={idx} className="ib-tag">{`${skill.name || 'untitled'}`}</span>
                      ))}
                      {/* <span key={idx} className="ib-tag">{`${skill.name || 'untitled'} ${skill.progress || 0}/10`}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </If>
          </If>

        </div>
        <div className="card-buttons">
          <button className="cb-item" onClick={this.handleEditClick}>Редактировать</button>
        </div>
      </div>
    );
  }
}
