module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.ts', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: (theme) => ({
      ...theme('colors'),
      main: '#cc9756',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      main: '#cc9756',
    }),
  },
  variants: {
    extend: {
      ringColor: ['hover', 'active'],
      invisible: ['hover', 'group-hover'],
    },
  },
  plugins: [],
};
