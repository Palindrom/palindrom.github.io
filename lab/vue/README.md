# vue

## Live demo

The live demo is located at https://palindrom.github.io/lab/vue/dist/index.html

## What is it

It is a simple demo of how to connect to Palindrom using a new project started with Vue CLI.

How this demo was created:

1. Instal Vue CLI as explained in https://cli.vuejs.org/guide/installation.html
2. Create a new folder for the demo: `mkdir vue && cd vue`
3. Initialize a new Vue project with Vue CLI: `vue create .`. This creates `package.json`, installs all NPM dependencies and configures Babel.
4. Call `npm run serve` and go to the URL provided by Vue CLI to verify that it works
5. Replace the content of the `App.vue` and `HelloWorld.vue` components with the code of the Palindrom demo. See the  comments in the annotated source code for details.
6. Call `npm run build` to create a production build. This creates the `dist/` subfolder that can be commited to Git in order to deploy the demo on GitHub Pages.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
