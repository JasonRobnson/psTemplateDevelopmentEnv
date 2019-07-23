import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.Node_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a momment...'));

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		//if fatal error occurred stop here
		console.log(chalk.red(err));
		return 1;
	}
	const jsonStats = stats.toJson();
	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if (jsonStats.hasWarnings) {
		console.log(chalk.yellow('Webpack generated the following warnings:'));
		jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
	}

	console.log(`Webpack stats: ${stats}`);

	//if we got this far, the build succeeded
	console.log(chalk.green('Your app has been built for production and written to /dist!'));

	return 0;
});
