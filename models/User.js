/**
 * Create by LiHongen on 2015/08/12
 * User model.
 */
'use strict';
var Redis = require('ioredis');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var options = require('../config/db_config').User_Redis;
var redis = new Redis(options);

module.exports = {
  isExist: function(uid, callback){
    redis.exists('user:'+uid, callback);
  },
  register: function(uid, params, callback) {
    redis.hmset('user:'+uid, params, callback);
  },
  incrUid: function(callback){
    redis.incr('user:', callback);
  }
  getUser: function(uid, callback){
    redis.hgetall('user:'+uid, callback);
  },
  getPwd: function(uid, callback){
    redis.hget('user:'+uid, pwd, callback)
  },
  verifyPwd: function(test, origin){
    crypto.pbkdf2(test, 'imcutesalt', 4096, 258, function(err, hash){
      if(err) throw new Error(err);
      return hash.toString('hex') == origin;
    })
  },
  update: function(uid, param, callback) {
    redis.hset('user:'+uid, param, callback);
  },
  signToken: function(uid) {
    return jwt.sign(uid, 'ssssskey', {
      'expiresInMinutes': 1440*5 // 设置过期时间:5天
    })
  },
  getUserNum: function(callback){
    redis.get('user:', callback)
  }
}
