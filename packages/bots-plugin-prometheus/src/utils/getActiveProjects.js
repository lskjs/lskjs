import axios from 'axios';
import Bluebird from 'bluebird';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import some from 'lodash/some';

export default async function getActiveProjects() {
  this.log.trace('getActiveProjects rules', this.projects.length);

  const checkState = ({ state, alert }) => {
    if (Array.isArray(state)) return some(state, checkState);
    if (isFunction(state) && !state(alert)) return false;
    return state === alert.state;
  };

  const checkCriteria = ({ criteria, alert }) => {
    if (Array.isArray(criteria)) return some(criteria, checkCriteria);
    if (isFunction(criteria) && !criteria(alert)) return false;
    const { state } = criteria;
    if (state && !checkState({ state, alert })) {
      this.log.trace('!checkState');
      return false;
    }
    return true;
  };

  const activeProjects = [];
  await Bluebird.map(this.projects, async (project) => {
    const { criteria = {}, alerts: url, action = {} } = project;

    const { data } = await axios(url);
    const alerts = get(data, 'data.alerts', []);

    const alertsFiltered = alerts.filter((alert) => {
      if (!checkCriteria({ criteria, alert })) {
        this.log.trace('!checkCriteria');
        return false;
      }
      if (!action) {
        this.log.trace('!action');
        return false;
      }
      return true;
    });

    activeProjects.push({
      action,
      alerts: alertsFiltered,
    });
  });

  this.activeProjects = activeProjects;
  this.log.trace('getActiveProjects', activeProjects);
  return activeProjects;
}
