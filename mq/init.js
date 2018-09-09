module.exports = (swc)=>{
	global.swc = {
		mq : {
			tasks : []
		}
	}
	var mq = {
		config : swc.config.mq,
		run : require('./run'),
		add_task : require('./controllers/add_task'),
		get_task : require('./controllers/get_task')
	};
	
	return mq;
}