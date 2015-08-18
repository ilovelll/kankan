/**
 * Create by LiHongen on 2015/08/12
 * User model.
 */
'use strict';
var Redis = require('ioredis');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var redis = new Redis({
  port: 58045,
	host: 'ubuntu-redred.myalauda.cn',
	password: 'redisred',
	db: 2
})

module.exports = {
  isExist: function(uid, callback){
    redis.exists(uid, callback);
  },
  register: function(uid, params, callback) {
    redis.hmset(uid, params, callback);
  },
  getUser: function(uid, callback){
    redis.hgetall(uid, callback);
  },
  getPwd: function(uid, callback){
    redis.hget(uid, pwd, callback)
  },
  verifyPwd: function(test, origin){
    crypto.pbkdf2(test, 'imcutesalt', 4096, 258, function(err, hash){
      if(err) throw new Error(err);
      return hash.toString('hex') == origin;
    })
  },
  update: function(uid, param, callback) {
    redis.hset(uid, param, callback);
  },
  signToken: function(uid) {
    return jwt.sign(uid, 'ssssskey', {
      'expiresInMinutes': 1440*5 // 设置过期时间:5天
    })
  }
}
