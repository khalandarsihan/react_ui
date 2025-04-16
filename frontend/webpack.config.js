const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "../react_ui/public/js/react_ui"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
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
		extensions: [".js", ".jsx"],
	},
};
