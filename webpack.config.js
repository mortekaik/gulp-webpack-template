const webpack = require('webpack');
const terserJSPlugin = require('terser-webpack-plugin');

const config = {
	entry: {
		about: './src/assets/scripts/about',
		auth: './src/assets/scripts/auth',
		works: './src/assets/scripts/works',
		blog: './src/assets/scripts/blog'
	},
	output: {
		filename: '[name].bundle.js'
	},
	devtool: 'cheap-module-inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new terserJSPlugin({
			parallel: true,
			sourceMap: true
		})
	]
};

module.exports = config;
