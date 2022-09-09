const { withSentryConfig } = require('@sentry/nextjs');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const path = require('path');
const customTheme = path.resolve('./styles/customTheme.less');

const SentryOptions = {
  sentry: {
    hideSourceMaps: true,
  },
};
const SentryWebpackPluginOptions = {
  silent: true,
};

const WithLessOptions = {
  lessLoaderOptions: {
    lessOptions: {
      additionalData: (content) => `${content}\n\n@import '${customTheme}';`,
    },
  },
};

const nextConfig = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['havruta.guru'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = withSentryConfig(
  withPlugins([[withLess, { WithLessOptions }]], nextConfig),
  SentryOptions,
  SentryWebpackPluginOptions
);
