const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    tailwindcss: {},
    ...(
        isProduction 
        ? {
            autoprefixer: {}
          }
        : {}
      )
  }
};