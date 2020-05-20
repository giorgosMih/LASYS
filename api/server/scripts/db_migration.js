const server = require('../server');
const ds = server.dataSources.mysql;

const models = server.models;
const mysqlTables = Object.keys(server.models)
.filter(modelName=>models[modelName].config.dataSource.name == 'mysql');

ds.autoupdate(mysqlTables, function(er) {
	if (er) throw er;
	console.log('Loopback tables [' + mysqlTables + '] created in ', ds.adapter.name);
	ds.disconnect();
});