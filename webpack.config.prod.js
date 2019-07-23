import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	devtool: 'source-map',
	mode: 'production',

	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index'),
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
	},
	plugins: [
		//Use CommonsChunkPlugin to create a seperate Bundle
		// of vendor libraries  so that they're cached separately
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// }),
		// //Create HTML file that includes ref to bundled JS.
		new HtmlWebpackPlugin({
			infect: true,
			filename: 'src/index.html',
		}),
		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),
		//Minify JS
		new webpack.optimize.UglifyJsPlugin(),
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader' },
			{ test: /\.css$/, loader: ['style-loader', 'css-loader'] },
		],
	},
	devServer: {
		noInfo: true,
		debug: true,
	},
};
