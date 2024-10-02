module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',  // This ensures compatibility with the current Node.js version
          },
        },
      ],
    ],
  };
  