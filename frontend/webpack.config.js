const path = require("path");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Convert environment variables to a format that webpack can use
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	mode: process.env.NODE_ENV || "development",
	entry: "./src/index.jsx",
	output: {
		path: path.resolve(__dirname, "react_ui/public/js/react_ui"),
		filename: "bundle.js",
		publicPath: "/assets/react_ui/js/react_ui/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							["@babel/preset-react", { runtime: "automatic" }],
						],
					},
				},
			},
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "styles"),
					path.resolve(__dirname),
				],
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".css"],
		modules: [path.resolve(__dirname), path.resolve(__dirname, "src"), "node_modules"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			styles: path.resolve(__dirname, "styles"),
			"~styles": path.resolve(__dirname, "src/styles"),
		},
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/styles"),
					to: path.resolve(__dirname, "react_ui/public/js/react_ui/styles"),
				},
			],
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		historyApiFallback: true,
		port: 3000,
		open: true,
		hot: true,
	},
};
