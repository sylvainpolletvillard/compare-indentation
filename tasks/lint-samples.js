const fs = require("fs")
const CLIEngine = require("eslint").CLIEngine;
const rules = require("../src/rules")

for(let rule of rules){
	let cli = new CLIEngine({
		envs: ["es6"],
		useEslintrc: false,
		fix: true,
		rules: rule.eslint
	});

	let report = cli.executeOnFiles(["static/sample.js"]);

	fs.writeFileSync(`static/linted/${rule.source}`, report.results[0].output)
}