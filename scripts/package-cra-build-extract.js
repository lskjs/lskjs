/* eslint-disable no-shadow */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const dir = process.cwd();
const assetManifestPath = `${dir}/public/asset-manifest.json`;
const manifest = require(assetManifestPath);

function getVendorName(manifest, ext = 'css') {
  const prefix = `static/${ext}/`;
  const vendorEntrypoints = manifest.entrypoints.filter(
    entrypoint =>
      entrypoint.startsWith(prefix) &&
      !(entrypoint.startsWith(`${prefix}main.`) || entrypoint.startsWith(`${prefix}runtime-main.`)),
  );
  if (vendorEntrypoints.length === 0) {
    console.error(`WARNING no vendorEntrypoints ${ext} for manifest`, manifest);
    return null;
  }
  if (vendorEntrypoints.length >= 2) {
    console.log('vendorEntrypoints', vendorEntrypoints);
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
console.log(`LSK MODIFFY ASSET MANIFEST: ${assetManifestPath}`);
console.log(`files["vendor.css"] => ${manifest.files['vendor.css']}`);
console.log(`files["vendor.js"] => ${manifest.files['vendor.js']}`);
require('fs').writeFileSync(assetManifestPath, JSON.stringify(manifest));
