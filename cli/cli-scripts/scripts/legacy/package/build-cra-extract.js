#!/usr/bin/env node
/* eslint-disable no-shadow */
/* eslint-disable import/no-dynamic-require */
const { run, log } = require('@lskjs/cli-utils');

const main = async () => {
  const dir = process.cwd();
  const assetManifestPath = `${dir}/public/asset-manifest.json`;
  const manifest = require(assetManifestPath);

  function getVendorName(manifest, ext = 'css') {
    const prefix = `static/${ext}/`;
    const vendorEntrypoints = manifest.entrypoints.filter(
      (entrypoint) =>
        entrypoint.startsWith(prefix) &&
        !(entrypoint.startsWith(`${prefix}main.`) || entrypoint.startsWith(`${prefix}runtime-main.`)),
    );
    if (vendorEntrypoints.length === 0) {
      log.error(`WARNING no vendorEntrypoints ${ext} for manifest`, manifest);
      return null;
    }
    if (vendorEntrypoints.length >= 2) {
      log.error('vendorEntrypoints', vendorEntrypoints);
      throw `MULTIPLE vendorEntrypoints${ext}`;
    }
    const path = vendorEntrypoints[0];
    const filename = path.substr(prefix.length);
    return filename.substr(0, filename.length - ext.length - 1);
  }
  if (getVendorName(manifest, 'css')) {
    const vendorNameCss = `static/css/${getVendorName(manifest, 'css')}.css`;
    manifest.files['vendor.css'] = manifest.files[vendorNameCss];
  }
  if (getVendorName(manifest, 'js')) {
    const vendorNameJs = `static/js/${getVendorName(manifest, 'js')}.js`;
    manifest.files['vendor.js'] = manifest.files[vendorNameJs];
  }
  log.debug(`LSK MODIFFY ASSET MANIFEST: ${assetManifestPath}`);
  log.debug(`files["vendor.css"] => ${manifest.files['vendor.css']}`);
  log.debug(`files["vendor.js"] => ${manifest.files['vendor.js']}`);
  require('fs').writeFileSync(assetManifestPath, JSON.stringify(manifest));
};

run(main);
