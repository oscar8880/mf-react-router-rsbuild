# Module Federation with Rsbuild and React Router

## Pre-requisites

- pnpm
- http-server  
  Install globally using:

  ```bash
  npm install http-server -g
  ```

## To run locally

```bash
pnpm i
cd remote
pnpm rsbuild build
cd build/client
http-server -p 3001 --cors
```

In a separate terminal window:

```bash
cd ../host
pnpm rsbuild dev
```

Navigate to: [http://localhost:3000/](http://localhost:3000/)

## Caveats

- rsbuild appears to be running the dev server of host in SSR mode. When attempting to build host and serve both host and remote statically, the build output of host is not set up for CSR and just serves an index of the files.
- CSS in the remote `Button` component is not loaded in correctly. When importing `app.css`, the server will attempt to fetch the module's CSS from the URL origin, not the remote's URL, so it fails.
- In `apps/host/rsbuild.config.ts`, `pluginReactRouter` — note how we are not actually enabling the module federation setting in its config. We set it to `false`. If set to `true`, you'll get:

  ```
  Error: You must provide a non-empty routes array to createStaticHandler
  ```

- In `sharedDependencies` config, all deps are `'eager: true'`. Without this, you'll get:

  ```
  Error: Invalid loadShareSync function call from runtime
  ```
