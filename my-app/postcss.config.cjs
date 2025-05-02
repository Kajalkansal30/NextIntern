// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss'),
//     require('autoprefixer'),
//   ],
// };

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
