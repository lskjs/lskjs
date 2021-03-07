  
module.exports = {
  '*.js?(x)': ['eslint --quiet --fix', 'prettier --write --plugin-search-dir=.', 'git add'],
  '*.ts?(x)': ['eslint --quiet --fix', 'prettier --write --plugin-search-dir=.', 'git add'],
  '*.json': ['eslint --quiet --fix', 'git add'],
  '*.md': ['npm run lint:md --fix', 'git add'],
};
