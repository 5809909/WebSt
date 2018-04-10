const path = require('path');

module.exports = {
	mode: 'development',
	devtool: "inline-source-map",
	watch: true,
	entry: './src/index.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath:'/dist/'
	},

	module: {
		rules: [
			// {
			// 	enforce: 'pre',
			// 	test: /\.jsx?$/,
			// 	exclude: /node_modules/,
			// 	loader: 'eslint-loader',
			// },
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.js','.jsx']	}

};