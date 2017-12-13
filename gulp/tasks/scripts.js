var gulp    = require('gulp'),
	webpack = require('webpack');

gulp.task('scripts', function(callback){
	//change to ../../webpack.config.js when deciding to deploy
	webpack(require('../../webpack.config.js'), function (error, stats){
		if(error){
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
});
