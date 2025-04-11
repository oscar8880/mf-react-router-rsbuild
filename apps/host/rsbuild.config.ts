import { defineConfig } from '@rsbuild/core';
import { pluginReactRouter } from 'rsbuild-plugin-react-router';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const sharedDependencies = {
  'react-router': {
    singleton: true,
    eager: true,
  },
  'react-router-dom': {
    singleton: true,
    eager: true,
  },
  react: {
    singleton: true,
    eager: true,
  },
  'react-dom': {
    singleton: true,
    eager: true,
  },
}

// Common Module Federation configuration
const commonFederationConfig = {
  name: 'host',
  shareStrategy: "version-first" as const,
  shared: sharedDependencies
}

// Common Module Federation configuration
const webFederationConfig = {
  ...commonFederationConfig,
  library: {
    type: 'module'
  },
  remoteType: 'import' as const,
  remotes: {
    remote: "http://localhost:3001/static/js/remote.js",
  }
  // filename: 'remoteEntry.js',
}


// // Node-specific federation config
// const nodeFederationConfig = {
//   ...commonFederationConfig,
//   dts: false,
//   remotes: {
//     remote: 'remote@http://localhost:3001/static/static/js/remote.js',
//   },
//   runtimePlugins: ['@module-federation/node/runtimePlugin'],
// }

export default defineConfig(() => {
  return {
    environments: {
      web: {
        source: {
          define: {
            WEB: 'true'
          }
        },
        tools: {
          rspack: {
            plugins: [
              new ModuleFederationPlugin(webFederationConfig)
            ]
          }
        },
        plugins: []
      },
      node: {
        tools: {
          rspack: {
            plugins: [
              new ModuleFederationPlugin(webFederationConfig),
            ],
          },
        },
        plugins: [],
      },
    },
    server: {
      port: 3000,
    },
    plugins: [
      pluginReactRouter({
        // customServer: true,
        // default: "module"
        serverOutput: "commonjs",
        //Optional: enable experimental support for module federation
        federation: false
      }),
      pluginReact()
    ],
  };
});