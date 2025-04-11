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
  name: 'remote',
  shareStrategy: "loaded-first" as const,
  runtime: undefined,
  exposes: {
    './Button': './app/button.tsx',
    './Chrome': './app/chrome.tsx',
    './About': './app/about.tsx',
  },
  shared: sharedDependencies,
  library: {
    type: 'module'
  },
  // filename: 'remoteEntry.js',
}

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
              new ModuleFederationPlugin(commonFederationConfig)
            ]
          }
        },
        plugins: []
      }
    },
    server: {
      port: 3001,
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