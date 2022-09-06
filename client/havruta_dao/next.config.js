const withLess = require('next-with-less');
const path = require('path');

const customTheme = path.resolve('./styles/customTheme.less');

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      additionalData: (content) => `${content}\n\n@import '${customTheme}';`,
    },
  },
  compiler: {
    styledComponents: true,
  },
});
