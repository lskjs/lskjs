/* eslint import/no-unresolved: 0, import/extensions: 0 */
import React, { Component } from 'react';
import If from 'react-if';
import autobind from 'core-decorators/lib/autobind';

import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Fuse from 'fuse.js';
import Magnify from 'react-icons2/mdi/magnify';
import map from 'lodash/map';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import Modal2, {
  Title,
  Subtitle,
  Content,
  Footer,
} from '../../../Modal2';

import TextButton from '../../atoms/TextButton';
import T from '../../../T';
import Button from '../../../Button';
import Input from '../../../Input';
import TreeInput from '../TreeInput';

import { Block, ScrollContent, Meta, InnerBlock } from './TreePicker.styles';

@inject('t')
@observer
class TreePicker extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    search: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fields: PropTypes.array,
    flat: PropTypes.bool,
  }

  static defaultProps = {
    children: <Button><T name="lskComponents.treePickerModalTrigger" /></Button>,
    search: '',
    value: null,
    fields: null,
    flat: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      value: props.value,
    };
    this.initFuse(props.fields);
  }

  componentWillReceiveProps(next) {
    const { fields, search, value } = this.props;
    if (fields !== next.fields) {
      this.initFuse(next.fields);
    }

    const state = {};
    if (search !== next.search) state.search = next.search;
    if (value !== next.value) state.value = next.value;
    this.setState(state);
  }

  getArrays(items, array = []) {
    items.forEach((item) => {
      item._title = item.title;
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getArrays(item.children, array, item);
        item._title = this.getChildrenTitles(item.children, item.title);
        array.push(omit(item, ['children']));
      } else {
        array.push(item);
      }
    });
    return uniqBy(array, '_id');
  }

  getChildrenTitles(items, titles = '') {
    items.forEach((item) => {
      item._title = item.title;
      titles += `.${item._title}`;
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getChildrenTitles(items.children, titles);
      }
    });
    return titles;
  }

  @autobind
  initFuse(fields) {
    this.fuse = new Fuse(this.getArrays(fields), {
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        '_title',
      ],
    });
  }

  @autobind
  handleSearch(search) {
    this.setState({ search });
  }

  @autobind
  handleSelect(value) {
    this.setState({ value }, this.callbackChange);
  }

  @autobind
  callbackChange() {
    const { onChange } = this.props;
    if (onChange) onChange(this.state.value);
  }

  @autobind
  resetToProps() {
    const { value, search } = this.props;
    this.setState({
      value,
      search,
    });
  }

  @autobind
  handleReset() {
    if (this.modal) this.modal.close();
  }

  @autobind
  async handleSubmit() {
    const { value } = this.state;
    const { onSubmit } = this.props;
    if (onSubmit) await onSubmit(value);
    if (this.modal) this.modal.close();
  }

  @autobind
  deepSearch(searchedFields, fields = this.props.fields || [], searchedFieldIds) {
    if (!searchedFieldIds) {
      searchedFieldIds = map(searchedFields, '_id');
    }
    const tree = JSON.parse(JSON.stringify(fields)).filter((field) => {
      if (searchedFieldIds.indexOf(field._id) !== -1) {
        if (Array.isArray(field.children) && field.children.length > 0) {
          field.children = this.deepSearch(searchedFields, field.children, searchedFieldIds);
        }
        return true;
      }
      return false;
    });
    return tree;
  }

  render() {
    const { search, value } = this.state;
    const {
      title,
      flat,
      fields,
      createTag,
      children,
      t,
      clearBtnStyles,
    } = this.props;
    let searchedFields = [];
    try {
      searchedFields = this.fuse.search(search);
    } catch (err) {
      console.log('TreePicker.render', 'searchedFields', searchedFields, err); // eslint-disable-line
    }
    const tree = searchedFields.length === 0 ? fields : this.deepSearch(searchedFields);
    return (
      <Modal2
        size="small"
        trigger={children}
        onClose={this.resetToProps}
        innerRef={(modal) => {
          this.modal = modal;
        }}
      >
        <Title>{title}</Title>
        <Block>
          <Magnify />
          <Input
            placeholder={t('treePicker.tags')}
            value={search}
            onChange={this.handleSearch}
          />
        </Block>
        <InnerBlock>
          <Subtitle>
            {t('admin.header.tags')} ({value ? value.length : 0 })
          </Subtitle>
          <Meta>
            <If condition={value && value.length > 0}>
              <TextButton
                className={clearBtnStyles}
                onClick={() => this.handleSelect([])}
              >
                {t('treePicker.cancel')}
              </TextButton>
            </If>
          </Meta>
        </InnerBlock>
        <Content style={{ paddingTop: 16 }}>
          <ScrollContent
            universal
            autoHide
            autoHeight
            autoHeightMin={0}
            autoHeightMax={256}
          >
            <TreeInput
              fields={!search ? fields : tree}
              value={value}
              onChange={this.handleSelect}
              flat={flat}
            />
            {createTag}
          </ScrollContent>
        </Content>
        <Footer>
          <Button paint="primary" onClick={this.handleSubmit}>
            {t('billing.done')}
          </Button>
          <Button
            paint="primary"
            view="text"
            onClick={this.handleReset}
          >
            {t('buttons.cancel')}
          </Button>
        </Footer>
      </Modal2>
    );
  }
}

export default TreePicker;
