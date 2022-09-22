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
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
    };
    return config;
  },
};

module.exports = withSentryConfig(
  withPlugins([[withLess, { WithLessOptions }]], nextConfig),
  SentryOptions,
  SentryWebpackPluginOptions
);
