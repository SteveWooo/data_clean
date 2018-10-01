const mysql = require('mysql');

module.exports = (conf)=>{
	var swc = {
		config : conf,
		mysql : mysql.createConnection(conf.mysql),
		modules : {
			hotel : require('../modules/hotel/init'),
			student : require('../modules/student/init')
		},
		controllers : {
			hotel : require('./hotel/init'),
			student : require('./student/init')
		},
	}
	swc.mysql.connect();

	return swc;
}