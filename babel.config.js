module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'react-native-reanimated/plugin',
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					tests: ['./tests/'],
					"@navigation": "./src/navigation",
					"@screens": "./src/screens",
					"@components": "./src/components",
					"@theme": "./src/theme/index",
					'@api': './src/api',
					'@assets': './src/assets',
					'@redux': './src/redux',
				}
			}
		]
	],
};
