module.exports = [
	{
		label: "Two spaces",
		source: "spaces2.js",
		eslint: {
			indent: ["error", 2]
		}
	},

	{
		label: "Four spaces",
		source: "spaces4.js",
		eslint: {
			indent: ["error", 4]
		}
	},

	{
		label: "Tabs only",
		source: "tabs.js",
		eslint: {
			indent: ["error", "tab"]
		}
	},

	{
		label: "Smart tabs",
		source: "smarttabs.js",
		eslint: {
			indent: ["error", "tab"],
			"no-mixed-spaces-and-tabs": [2, "smart-tabs"]
		}
	}
]
