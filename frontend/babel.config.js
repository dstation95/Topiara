module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "module:react-native-dotenv",
      'react-native-reanimated/plugin'
    ]
  };
};


// // babel.config.js

// module.exports = {
//   plugins: [
//     [
//       'dotenv-import',
//       {
//         allowUndefined: true,
//         moduleName: '@env',
//         path: '.env',
//         safe: false,
//       },
//     ],
//   ],
//   presets: ['module:metro-react-native-babel-preset'],
// }