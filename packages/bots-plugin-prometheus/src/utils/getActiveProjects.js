import axios from 'axios';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isMatch from 'lodash/isMatch';
import isPlainObject from 'lodash/isPlainObject';
import some from 'lodash/some';

export default async function getActiveProjects(project) {
  this.log.trace('getActiveProjects rules', this.projects.length);

  const checkState = ({ state, alert }) => {
    if (Array.isArray(state)) return some(state, checkState);
    if (isFunction(state) && !state(alert)) return false;
    return state === alert.state;
  };
  const checkLabels = ({ labels, alert }) => {
    if (Array.isArray(labels)) return some(labels, checkLabels);
    if (isFunction(labels) && !labels(alert)) return false;
    if (isPlainObject(labels)) return isMatch(alert.labels, labels);
    return labels === alert.labels;
  };

  const checkCriteria = ({ criteria, alert }) => {
    if (Array.isArray(criteria)) return some(criteria, checkCriteria);
    if (isFunction(criteria) && !criteria(alert)) return false;
    const { state, labels } = criteria;

    if (state && !checkState({ state, alert })) {
      this.log.trace('!checkState');
      return false;
    }
    if (labels && !checkLabels({ labels, alert })) {
      this.log.trace('!checkLabels');
      return false;
    }
    return true;
  };

  const { criteria = {}, alerts: url, action } = project;

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

  this.activeProjects = [
    {
      action,
      alerts: alertsFiltered,
    },
  ];

  this.log.trace('getActiveProjects', this.activeProjects);
  return this.activeProjects;
}
