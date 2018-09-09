module.exports = async (swc)=>{
	// swc.mysql.query("select * from `hotel`", (err, result)=>{
	// 	console.log(result)
	// })

	swc.modules.hotel.get_data(swc);
}