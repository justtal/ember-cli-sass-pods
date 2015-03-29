module.exports = {
	normalizeEntityName: function() {
		// allows us to run ember -g ember-cli-bootswatch and not blow up
		// because ember cli normally expects the format
		// ember generate <entitiyName> <blueprint
	},
	afterInstall: function(options) {
		return this.addPackageToProject('ember-cli-sass');
	}
};