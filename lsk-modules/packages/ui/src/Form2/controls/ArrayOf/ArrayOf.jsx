import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import isArray from 'lodash/isArray';
import { Field } from 'formik';
import Tooltip from 'antd/lib/tooltip';
import CloseIcon from 'react-icons2/mdi/close';
import If from 'react-if';
import DebugJson from '../DebugJson';
import IconCircleButton from '../../../UI/atoms/IconCircleButton';
import Horizontal from '../../../UI/atoms/Horizontal';


const DefaultRemoveButton = props => <IconCircleButton {...props}><CloseIcon /></IconCircleButton>;
const DefaultAddButton = props => <IconCircleButton {...props} />;

class ArrayOf extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return !isEqual(nextProps.value, this.props.value) || !isEqual(nextState.value, this.state.value);
  // }

  // @debounce(100)
  // onChangeDebounced() {
  //   this.onChange();
  // }

  // @autobind
  // onChange() {
  //   const { value } = this.state;
  //   this.props.onChange && this.props.onChange((value || []).filter(a => a));
  // }

  // @autobind
  // onChangeHandler(i, val) {
  //   const value = [...this.state.value];
  //   value[i] = val;

  //   this.setState({
  //     value,
  //   }, () => {
  //     this.onChangeDebounced();
  //   });
  // }

  // @autobind
  // onBlurHandler(i) {
  //   if (this.state.value.length > 1) {
  //     if (this.state.value[i] === '') {
  //       const value = [...this.state.value];
  //       value.splice(i, 1);

  //       this.setState({
  //         value,
  //       }, () => {
  //         this.onChangeDebounced();
  //       });
  //     }
  //   }
  // }


  getValues() {
    const {
      field, maxCount, autoAddLastItem, itemInitialValue = null,
    } = this.props;
    let value = field.value || [];
    if (!isArray(value)) value = [];
    if (maxCount) {
      value = value.slice(0, maxCount);
    }
    if (value.length === maxCount) return value;


    if (typeof autoAddLastItem !== 'undefined') {
      return [
        ...value,
        itemInitialValue,
      ];
    }
    return value;
  }


  @autobind
  removeButtonHandler(key) {
    const { form, field } = this.props;

    let value = field.value || [];
    if (!isArray(value)) value = [];
    // console.log('1111', value);
    // console.log('2222', [
    //   ...value.slice(0, key),
    //   ...value.slice(key + 1),
    // ]);


    form.setFieldValue(field.name, [
      ...value.slice(0, key),
      ...value.slice(key + 1),
    ]);
  }

  @autobind
  addButtonHandler() {
    const { form, field, itemInitialValue = null } = this.props;
    // console.log({ form, field });

    let value = field.value || [];
    if (!isArray(value)) value = [];

    form.setFieldValue(field.name, [
      ...value,
      itemInitialValue,
    ]);
  }

  render() {
    const {
      field,
      // form,
      // onError,
      autoAddLastItem,
      itemComponent,
      itemProps = {},
      showRemoveButton,
      removeButton: RemoveButton = DefaultRemoveButton,
      showAddButton,
      addButton: AddButton = DefaultAddButton,
      maxCount,
      // ...props
    } = this.props;
    // console.log('@#@#@#', { props, field, form });
    const values = this.getValues();
    const ItemComponent = itemComponent || DebugJson;
    const addBtn = (
      <If condition={(showAddButton || AddButton) && (!maxCount || values.length < maxCount)}>
        <Tooltip placement="right" title="Добавить элемент">
          <AddButton onClick={this.addButtonHandler} />
        </Tooltip>
      </If>
    );
    // console.log(values);
    return (
      <React.Fragment>
        {values.map((value, key) => {
          const children = (
            <Field
              key={key}  //eslint-disable-line
              component={ItemComponent}
              name={`${field.name}.${key}`}
              // initialValue={value}
              showRemoveButton={showRemoveButton}
              {...itemProps}
              value={value}
            />
          );
          // if (!showRemoveButton || (values.length === 1 && autoAddLastItem)) return children;
          return (
            <Horizontal>
              <div style={{ width: 50, paddingTop: 4 }}>
                <If condition={showRemoveButton && !(values.length === key + 1 && autoAddLastItem)}>
                  <Tooltip placement="right" title="Удалить элемент">
                    <RemoveButton onClick={() => this.removeButtonHandler(key)} />
                  </Tooltip>
                </If>
                <If condition={!showAddButton && values.length === 1}>
                  {addBtn}
                </If>
              </div>
              <div style={{ flex: 1 }}>
                {children}
              </div>
            </Horizontal>
          );
        })}
        <If condition={values.length > 1 || showAddButton}>
          {addBtn}
        </If>
      </React.Fragment>
    );
  }
}

export default ArrayOf;
