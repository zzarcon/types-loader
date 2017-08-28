const getDefinitionsFromSource = require('./typeParser').getDefinitionsFromSource;

module.exports = function(content) {
  const definitions = getDefinitionsFromSource(this.resourcePath, content);

  return `module.exports = ${JSON.stringify(definitions)}`;
};