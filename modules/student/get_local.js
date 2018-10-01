const fs = require('fs');
const readline = require('readline');
const xlsx = require("node-xlsx");

function build_source_data(swc){
	var data = xlsx.parse(path);
	swc.mysql.connect();
	// console.log(data)
	var result = data[0].data.map(d=>{
		var data = `real_name=${d[0]}\`
			gender=${d[1]}\`
			id_card=${d[2]}\`
			nation=${d[3]}\`
			diploma=${d[4]}\`
			college=${d[5]}\`
			major=${d[7]}\`
			student_source=${d[9]}\`
			student_number=${d[12]}\`
			gradurate_in=${d[14]}\`
			phone=${d[15]}\`
			mail=${d[16]}
			`
		return data.replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, "");
	})

	fs.writeFileSync('./res', result.join("\n"));
}

function write_data(swc, sql){
	return new Promise((resolve, reject)=>{
		swc.mysql.query(sql, (err)=>{
			if(err){
				console.log(err)
				reject(err);
				return ;
			}
			resolve();
		})
	})
}

const mysql = require('mysql')
module.exports = async (swc, g)=>{
	// build_source_data(swc, g);
	// let reader = readline.createInterface({
	// 	input : fs.createReadStream("./student")
	// })

	// var cache = [];
	// reader.on("line", (chunk)=>{
	// 	if(cache.length <= 1000){
	// 		cache.push(chunk);
	// 		return ;
	// 	}
	// 	swc.mq.add_task(swc, {
	// 		data : cache,
	// 		callback : {
	// 			type : "modules",
	// 			group : "student",
	// 			func : "set_local"
	// 		}
	// 	})
	// 	cache = [];
	// })

	// let err_file = fs.readFileSync("./err").toString().replace(/\\/g, "");
	// console.log(err_file);
	// let content = err_file.substring(err_file.indexOf("VALUES (") + 7).split("),(");
	// let members = content.map(d=>{
	// 	d = d.replace(/\(/g, "").replace(/\'/g, "");
	// 	d = d.split(",");
	// 	d = mysql.escape(d);
	// 	return "("+d+")";
	// })
	
	// for(var i=0;i<members.length;i++){
	// 	var sql = "INSERT INTO `student` (`real_name`,`gender`,`id_card`,`nation`,`diploma`,`college`,`major`,`student_source`,`student_number`,`gradurate_in`,`phone`,`mail`) VALUES ";
	// 	sql = sql + members[i]
	// 	try{
	// 		await write_data(swc, sql);
	// 		console.log("finished:" + i);
	// 	}catch(e){
	// 		console.log(e);
	// 	}
	// }
}