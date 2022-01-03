const { alias, aliasJest } = require("react-app-rewire-alias"); // DO NOT CONVERT TO ES6 MODULE STYLE!

const aliasMap = {
  "@components": "src/components",
  "@config": "src/config.js",
  "@assets": "src/assets",
  "@api": "src/api",
  "@utils": "src/utils",
  "@redux": "src/redux",
  "@validation": "src/validation",
  "@dict": "src/dict",
  "@pages": "src/pages",
  "@views": "src/views",
};

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);
