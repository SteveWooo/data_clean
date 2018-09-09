const fs = require('fs');
const readline = require('readline')
const path = "J:\\社工\\开房记录\\2000W酒店开房数据库\\酒店开房数据库-J-1800W-2000W.csv"

module.exports = (swc)=>{
	let reader = readline.createInterface({
		input : fs.createReadStream(path)
	})

	var cache = [];
	reader.on("line", (chunk)=>{
		if(chunk.indexOf(',,,') < 0){
			return ;
		}
		if(cache.length <= 1000){
			cache.push(chunk);
			return ;
		}
		swc.mq.add_task(swc, {
			data : cache,
			callback : {
				type : "modules",
				group : "hotel",
				func : "set_data"
			}
		})
		cache = [];
	})

	reader.on("close", ()=>{
		
	})
}