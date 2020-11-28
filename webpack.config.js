const path = require('path');
const webpack = require('webpack');
const html = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	resolve: {
		extensions: ['.js', '.ts', '.vue'],
	  	alias: {
	    	'Vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' для webpack 1
	  	}
	},
	entry: {
		index: { import: './src/index.js', dependOn: 'shared' },
		// another: { import: './src/another-module.js', dependOn: 'shared' },
		shared: 'lodash'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000,
		hot: true,
	},
	optimization: {
		minimize: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new html({
			title: 'Лабораторная работа 3',
			template: './src/index.ejs'
		}),
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({
		  // Vue: ['vue/dist/vue.esm.js', 'default'],
		  $: 'jQuery',
		  'jQuery': 'jQuery'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './',
	},
	module: {
		rules: [
			{
      		  test: /\.vue$/,
      		  loader: 'vue-loader'
      		},
      		// {
      		//   test: /\.ejs$/,
      		//   use: {
      		//     loader: 'ejs-templates-loader',
      		//     options: {}
      		//   }

      		// },
			{
		      test: /\.m?js$/,
		      // exclude: /(node_modules|bower_components)/,
		      exclude: file => (
		      	/node_modules/.test(file) &&
		      	!/\.vue\.js/.test(file)
		      ),
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['@babel/preset-env']
		        }
		      }
		    },
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					// 'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							sassOptions: {
								fiber: false,
								outputStyle: 'compressed'
							},
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [
					'file-loader'
				]
			},
		]
	},
}