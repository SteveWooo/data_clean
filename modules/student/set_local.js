const mysql = require("mysql");
function get_values(swc, task){
	let source_data = task.data;

	let res = source_data.map(d=>{
		let temp = {};
		let t = d.split("`");
		t.map(detail=>{
			detail = detail.split("=");
			temp[detail[0]] = detail[1];
		})

		return temp;
	})

	let value = res.map(d=>{
		let item = [];
		for(var i in d){
			if(d[i] == "undefined"){
				item.push(mysql.escape("-"));
			}else {
				item.push(mysql.escape(d[i]));
			}
		}
		item = item.join(",");
		return "("+item+")";
	}).join(",")
	return value;
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


function get_sql(swc, task){
	let keys = "`real_name`,`gender`,`id_card`,`nation`,`diploma`,`college`,`major`,`student_source`,`student_number`,`gradurate_in`,`phone`,`mail`";
	let values = get_values(swc, task);
	let sql = "INSERT INTO `student` ("+keys+") VALUES "+values;
	return sql;
}

module.exports = async(swc, task)=>{
	let sql = get_sql(swc, task);
	try{
		await write_data(swc, sql);
	}catch(e){
		console.log(e);
		return {
			code : 5000,
		}
	}
	return {
		code : 2000
	}
}