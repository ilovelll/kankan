'use strict';
var Redis = require('ioredis');
var options = require('../config/db_config').User_Redis;
var redis = new Redis(options);

// for(var i = 1;i<=2;i++){
//   redis.hgetall('user:'+i, function(err, result){
//     console.log(result);
//   })
// }

redis.multi().hgetall('user:1').hgetall('user:2').exec(function(err, result){console.log(result)})
