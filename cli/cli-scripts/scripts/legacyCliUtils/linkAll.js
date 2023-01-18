#!/usr/bin/env node
const { link } = require('./link');
const { getShortPath } = require('./getShortPath');
const { log } = require('./log');

const getLinks = (links) => {
  const dirs = [];
  links.forEach(({ from, to } = {}) => {
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(to)) to = [to];
    to.forEach((dir) => {
      dirs.push([from, dir]);
    });
  });
  return dirs;
};

const getLinkRightPad = (str, maxLength) => ''.padEnd(maxLength - str.length, ' ');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const linkAll = async (config, options = {}) => {
  // TODO: pass options
  const links = getLinks(config);
  const maxLength = Math.max(...links.map(([from]) => from.length));
  const str = links
    .map(([from, to]) => `${getShortPath(from)}${getLinkRightPad(from, maxLength)} => ${getShortPath(to)}`)
    .join('\n');
  log.info(`
==================== LINKING ======================

${str}

==================== LINKING ======================
  `);
  links.forEach(async ([from, to]) => {
    link({ from, to }, options);
  });
};

module.exports = {
  getLinks,
  getLinkRightPad,
  linkAll,
};
