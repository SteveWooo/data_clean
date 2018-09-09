const mysql = require('mysql');

module.exports = (conf)=>{
	var swc = {
		config : conf,
		mysql : mysql.createConnection(conf.mysql),
		modules : {
			hotel : require('../modules/hotel/init')
		},
		controllers : {
			hotel : require('./hotel/init')
		},
	}
	swc.mysql.connect();

	return swc;
}