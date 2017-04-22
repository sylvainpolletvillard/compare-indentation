<template>
	<div id="app">
		<h1>Compare indentation rules</h1>
		<section class="controls">
			<label for="ctrl-rule">
				Rule:
			</label>
			<select name="ctrl-rule" id="ctrl-rule" @change="changeRule">
				<option v-for="(rule, index) in rules"
				        :value="index">
					{{ rule.label }}
				</option>
			</select>

			<label for="ctrl-tab-width">
				Tab width:
			</label>
			<input name="ctrl-tab-width"
			       id="ctrl-tab-width"
			       v-model="tabSize"
			       type="range"
			       min="1"
			       max="8">
		</section>
		<section class="demo">
			<pre :style="{ tabSize }"><code v-html="sample"></code></pre>
			<aside class="indent-count">
				<span v-for="line in lines" :class="'lvl-'+calcIndent(line)">
					{{calcIndent(line)}}
				</span>
			</aside>
		</section>
	</div>
</template>

<script>

	import rules from "../rules";

	export default {
		name: 'app',

		data: function () {
			return {
				sample: "",
				rules,
				rule: rules[0],
				tabSize: 4
			}
		},

		created(){
			this.getFormattedSample()
		},

		methods: {
			changeRule(e){
				this.rule = this.rules[+e.target.value]
				this.getFormattedSample();
			},

			getFormattedSample(){
				fetch(`linted/${this.rule.source}`)
					.then(res => res.text())
					.then(code => { this.sample = code })
			},

			calcIndent(line){
				if(this.rule.label.includes("space")){
					return Math.floor(line.match(/^[ ]*/)[0].length / this.rule.eslint.indent[1])
				}
				return line.match(/^[\t]*/)[0].length
			}
		},

		computed: {
			lines(){
				return this.sample.split('\n')
			}
		}
	}
</script>

<style lang="postcss">
	@import "../../node_modules/sanitize.css/sanitize.css";

	body {
		background-color: #333;
		color: #eee;
		text-shadow: #222 0 2px 0;
		margin: 0;
		text-align: center;
	}

	select {
		background-color: #333;
		color: #eee;
	}

	.controls {
		margin: 1em;

		label {
			margin: 0 0.5em;
		}

	    > * {
			vertical-align: middle;
	    }
	}

	section.demo {
		margin: auto;
		width: 600px;
		padding: 1em;
		position: relative;
		background: #1d1f20;
	}

	code,
	.indent-count {
		display: block;
		text-align: left;
		line-height: 16px;
	}

	pre, code {
		margin: 0;
	}

	code {
		border-left: 1px solid #333;
		margin-left: 1em;
	}

	.indent-count {
		position: absolute;
		top: 1em;
		left: 0;
		width: 2em;

		span {
			display: block;
			height: 16px;
			font-size: 14px;
			color: darkorange;
			text-align: center;
			position: relative;
			top: 2px;
		}

	    .lvl-0 { background: #000; }
	    .lvl-1 { background: #111; }
	    .lvl-2 { background: #222; }
	    .lvl-3 { background: #333; }
	}
</style>
