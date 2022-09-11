// need to integrate prettier with eslint for this to work right now eslint-config-prettier is ignoring this file for ESLint I think

module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
};
