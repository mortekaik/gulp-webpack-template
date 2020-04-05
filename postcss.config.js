module.exports = {
	syntax: "postcss-scss",
	plugins: [
		require("postcss-easy-import")({
			extensions: ".scss"
		}),
		require("autoprefixer")({
			cascade: false,
			grid: true
		}),
		require("postcss-advanced-variables")({
			variables: require("./src/assets/styles/variables")
		}),
		require("postcss-nested"),
		require("cssnano")({
			preset: 'default',
		})
	]
};
