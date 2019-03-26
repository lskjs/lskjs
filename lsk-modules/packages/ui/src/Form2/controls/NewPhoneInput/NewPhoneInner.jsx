// import React from 'react';
// import PhoneInput from 'react-phone-input-2';
// import styled from '@emotion/styled';
// import PropTypes from 'prop-types';

// const Container = styled.div`
//   .flag-dropdown{
//     border: 1px solid #1890ff;
//     background: none;
//   }
//   .form-control:focus{
//     font-size: 1.1em;
//   }
// `;

// class NewPhoneInner extends React.Component {
//   static propTypes = {
//     value: PropTypes.string,
//     defaultCountry: PropTypes.string,
//   };
//   static defaultProps = {
//     value: '',
//     defaultCountry: 'ru',
//   };
//   handleChange(value) {
//     const prefixedValue = (value || '').startsWith('+') ? value : `+${value}`;
//     this.props.form.setFieldValue(this.props.field.name, prefixedValue.replace(/\D+/g, ''));
//   }
//   render() {
//     const { value, ...props } = this.props;
//     const prefixedValue = (value || '').startsWith('+') ? value : `+${value}`;
//     return (
//       <Container>
//         <PhoneInput value={prefixedValue}{...props} onChange={this.handleChange} />
//       </Container>
//     );
//   }
// }

// export default NewPhoneInner;
