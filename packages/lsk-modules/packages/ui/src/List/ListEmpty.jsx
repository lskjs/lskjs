import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import If from 'react-if';
import Button from '../Button';
import T from '../T';
import Error404 from '../UI/molecules/ErrorComponent/svg/error404';
import EmptyContainer from '../UI/molecules/EmptyContainer';


@inject('listStore', 't')
@observer
class ListEmpty extends Component {
  getType() { //eslint-disable-line
    const { listStore, type } = this.props;
    if (type) return type;
    if (!listStore.fetchedAt) {
      return 1;
      // 1) совсем пусто, первый раз заходим
    }
    if (!listStore.hasFilter) {
      // 2) пусто после фетча, фильры выключены
      return 2;
    }
    if (!listStore.skip) {
      // 3) пусто после фетча, фильтры включены, скип не стоит
      return 3;
    }
    // 4) пусто после фетча, фильтры включены, скип стоит */}

    return 4;
  }
  render() {
    const { listStore } = this.props;
    const type = this.getType();
    return (
      <div>
        {/* 1) загружаем первый раз
        2) загружаем второй раз, меняя фильтры
        3) загружаем второй раз, меняя skip, фильтры не меняются
        4) до загружаем второй раз, используя fetch next / fetch prev
        */}
        {/* Loading! */}
        {/* {listStore.hasFilter ? 'hasFilter' : '!hasFilter'} */}
        <If condition={type === 1}>
          <EmptyContainer
            title={<T name="lskList.emptyDataTitle" />}
            icon={
              <Error404 height="200" width="100%" />
            }
            subtitle={<T name="lskList.emptyDataErrorOne" />}
            actions={
              <Button
                paint="primary"
                onClick={() => listStore.fetch()}
              >
                <T name="common.refresh" />
              </Button>
            }
          />
        </If>
        <If condition={type === 2}>
          <EmptyContainer
            title={<T name="lskList.emptyDataTitle" />}
            icon={
              <Error404 height="200" width="100%" />
            }
            subtitle={<T name="lskList.emptyDataErrorTwo" />}
          />
          {/* пусто после фетча, фильры выключены

          Сорян нет данных
          Возможно ошибка и нужно перезагрузить, а возможно и нет */}
        </If>
        <If condition={type === 3}>
          <EmptyContainer
            title={<T name="lskList.emptyDataTitle" />}
            icon={
              <Error404 height="200" width="100%" />
            }
            subtitle={<T name="lskList.emptyDataErrorThree" />}
            actions={
              <Button
                paint="primary"
                onClick={() => listStore.clearFilter()}
              >
                <T name="lskList.emptyDataResetButton" />
              </Button>
            }
          />
          {/* пусто после фетча, фильтры включены */}
        </If>
        <If condition={type === 4}>
          <EmptyContainer
            title={<T name="lskList.emptyDataTitle" />}
            icon={
              <Error404 height="200" width="100%" />
            }
            subtitle={<T name="lskList.emptyDataErrorFour" />}
            actions={
              <Button
                paint="primary"
                onClick={() => listStore.setSkip(0)}
              >
                <T name="lskList.emptyDataToFirstPage" />
              </Button>
            }
          />
          {/* пусто после фетча, фильтры включены, скип стоит
          Страница почему-то пуста, переключиться на первую */}
        </If>
      </div>
    );
  }
}

export default ListEmpty;
