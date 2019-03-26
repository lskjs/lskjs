
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DEV from '../DEV';
import { contextToProps } from './List.context';

@contextToProps('List', 'HeaderItem')
@inject('listStore')
@observer
class ListHeaderRow extends Component {
  render() {
    const { List, listStore } = this.props;
    let { children } = this.props;

    if (!children) {
      const { HeaderItem } = this.props;
      if (!HeaderItem) return null; // <DEV json="!HeaderItem" />;
      children = (
        <HeaderItem
          toggleSort={listStore.toggleSort}
          sort={listStore.sort}
        />
      );
    }
    return (
      <List.HeaderItemWrapper>
        {children}
      </List.HeaderItemWrapper>
    );
  }
}

export default ListHeaderRow;


// import React, { Component } from 'react';

// import DEV from '../DEV';
// import { ListTableHeader } from './List.styles';
// import { Consumer } from './List.context';

// export const contextToProps = Context => Component => props => (
//   <Context.Consumer>{context => <Component {...context} {...props} />}</Context.Consumer>
// );

// class ListHeaderItem extends Component {
//   render() {
//     return (
//       <Consumer>
//         {({ List }) => {
//           let { children } = this.props;
//           if (!children) {
//             const {
//               HeaderItem = List.props.HeaderItem,
//             } = this.props;
//             if (!HeaderItem) return <DEV json="!HeaderItem" />;
//             children = <HeaderItem />;
//           }
//           return (
//             <ListTableHeader>
//               {children}
//             </ListTableHeader>
//           );
//         }}
//       </Consumer>
//     );
//   }
// }


// export default ListHeaderItem;


// import React, { Component } from 'react';

// import DEV from '../DEV';
// import { ListTableHeader } from './List.styles';
// import { Consumer } from './List.context';
// import { inject } from 'mobx-react';

// @inject('HeaderItem')
// class ListHeaderItem extends Component {
//   render() {
//     let { children, HeaderItem } = this.props;
//     if (!children) {
//       if (!HeaderItem) return <DEV json="!HeaderItem" />;
//       children = <HeaderItem />;
//     }
//     return (
//       <ListTableHeader>
//         {children}
//       </ListTableHeader>
//     );
//   }
// }


// export default ListHeaderItem;
