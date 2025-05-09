// postcss.config.cjs
module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},  // ← note the new package name
      autoprefixer: {},            // ← still autoprefixer
    },
  };