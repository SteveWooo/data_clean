const mysql = require('mysql');

function get_sql_value (swc, list){
	let value = list.map(line=>{
		line = line.split(',');
		for(var i=0;i<line.length;i++){
			line[i] = mysql.escape(line[i]);
		}
		let val = `("${line[0] || "-"}", 
			"${line[19] || "-"}, ${line[20] || "-"}", "${line[19] || "-"}",
			"${line[4] || "-"}",
			"${line[22] || "-"}", "${line[22] || "-"}",
			"${line[7] || "-"}", "${line[7] || "-"}")`;
		return val.replace(/\n/g, '').replace(/\t/g, '');
	})

	return value.join(',');
}

function get_sql(swc, list){
	let sql = `INSERT INTO \`hotel\` (\`real_name\`, 
		\`phones\`, \`phone_primary\`,
		\`id_card\`,
		\`mails\`, \`mail_primary\`,
		\`addresses\`, \`address_primary\`) VALUES ${get_sql_value(swc, list)}`;
	return sql.replace(/\n/g, '').replace(/\t/g, '');
}

function write_data(swc, sql){
	return new Promise((resolve, reject)=>{
		swc.mysql.query(sql, (err)=>{
			if(err){
				reject(err);
				return ;
			}
			resolve();
		})
	})
}

module.exports = async (swc, task)=>{
	let list = task.data;
	let sql = get_sql(swc, list);
	// console.log(sql);
	try{
		let res = await write_data(swc, sql);
	}catch(e){
		// console.log(e);
		console.log(e.message);
	}
	return {
		code : 2000
	}
}