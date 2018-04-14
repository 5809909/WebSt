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
                test: /\.(png|jpe?g|gif|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },

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