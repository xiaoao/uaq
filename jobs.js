module.exports = {
	jobs: [{
	 	job: "marksite",
	 	command: 'phantomjs ./tools/yslow.js -i grade -f json %s > public/jsons/%s.json',
	 	workers: 1
	},{
		job: 'allinone',
		command: 'phantomjs ./tools/allinone.js %s %s',
		workers: 1
	}],
	services: [{
		job: "capture",
	 	command: 'phantomjs ./tools/capture.js %s %s %s %s',
	 	workers: 1
	}]
}