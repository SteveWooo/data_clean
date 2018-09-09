async function do_task(swc, task){
	try {
		//type : controller || modules
		//func : function
		//group : hotel or others
		let res = await swc[task.callback.type][task.callback.group][task.callback.func](swc, task);

		if(res.code == 2000){
			return res;
		} else {
			//重试吧
		}
	} catch(e){
		console.log(e);
		return {
			code : 4004,
			message : "找不到回调函数"
		}
	}
}

async function run(swc){
	console.log(global.swc.mq.tasks.length)
	let task = swc.mq.get_task(swc);
	let res;
	if(task != undefined){
		res = await do_task(swc, task);
	}

	setTimeout(async()=>{
		run(swc);
	}, swc.config.mq.span);
}

module.exports = (swc)=>{
	run(swc);
	return ;
}