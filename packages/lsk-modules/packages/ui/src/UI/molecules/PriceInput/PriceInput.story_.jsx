// import PriceInput from './PriceInput';
import React from 'react';
import { Provider } from 'mobx-react';
import Form from '../../../Form';

// class PriceInputWrapper extends Component {
//   state = {
//     value: 0,
//     fee: 0,
//     result: 0,
//   }

//   render() {
//     const feeRate = 1.133333333;
//     const taxRate = 0.20;
//     const { value } = this.state;
//     return (
//       <div>
//         <div>
//           state.value = {this.state.value} <br />
//           state.fee = {this.state.fee} <br />
//           state.result = {this.state.result} <br />
//           feeRate = {feeRate} <br />
//           taxRate = {taxRate} <br />
//         </div>
//         <Provider t={a => a}>
//           <PriceInput
//             value={value}
//             rate={feeRate}
//             max={75000}
//             onChange={({ value, fee, result }) => {
//               setTimeout(() => {
//                 this.setState({ value, fee, result });
//               }, 300);
//             }}
//           />
//         </Provider>
//       </div>
//     );
//   }
// }


export default ({ storiesOf, action }) => {
  return storiesOf('PriceInput', module)
    .add('default', () => {
      return (
        <Provider t={a => a}>
          <Form
            fields={[
              {
                name: 'price',
                title: 'Цена',
                value: 5000,
                controlType: 'priceInput',
                control: {
                  rate: 1.15,
                  title1: 'На руки',
                  title2: 'Цена в системе',
                  help: 'info.test.test2',
                },
                validator: {
                  presence: {
                    message: 'errors.emptyField',
                  },
                  numericality: {
                    lessThanOrEqualTo: 1000,
                    greaterThanOrEqualTo: 10,
                  },
                },
              },
            ]}
            onSubmit={action('onSubmit')}
          />
        </Provider>
      );
      // return (<PriceCalculator2Wrapper />);
    });
};
