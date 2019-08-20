module.exports = cli => {
  cli.injectFeature({
    name: "Eslint",
    value: "eslint",
    short: "eslint",
    description: "Check and enforce code quality with ESLint or Prettier",
    link:
      "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",
    plugins: ["eslint"],
    checked: true
  });
};
