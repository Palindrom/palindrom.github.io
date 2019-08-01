module.exports = {
    publicPath: './', // use relative URLs in generated code. This is needed because the app is deployed in a deep path at GitHub Pages,
    lintOnSave: false // turn off ESLint, otherwise it throws errors "No ESLint configuration found." for dependencies loaded using ../ or npm link
};