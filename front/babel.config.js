module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/env", {
      targets: '> 1%, ie >= 11, not dead'
    }],
  ],
}
