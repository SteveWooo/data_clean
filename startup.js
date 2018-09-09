const config = require('./conf.json');
var swc = require('./controllers/init')(config);
swc.mq = require('./mq/init')(swc);
swc.mq.run(swc);

//business
swc.controllers.hotel.run(swc);