/**
 * Create by LiHongen on 2015/08/12
 * User model.
 */
'use strict';
var Redis = require('ioredis');
var redis = new Redis({
  port: 58045,
	host: 'ubuntu-redred.myalauda.cn',
	password: 'redisred',
	db: 2
})

module.exports = {
  isExist: function(uid, callback){
    redis.exists(uid, function(err, reuslt){
      if(err) return next(err);
      callback(null, result);
    })
  },
  singup: function(uid, params, callback) {
    redis.hmset(uid, params, function(err, result){
      if(err) return next(err);
      callback(null, result);
    })
  },
  getUser: function(uid, callback){
    redis.hgetall(uid, function(err, result){
      if(err) return next(err);
      callback(null, result);
    })
  },
  update: function(uid, param, callback) {
    redis.hset(uid, param, callback) {
      if(err) return next(err);
      callback(null, result);
    }
  }
}
