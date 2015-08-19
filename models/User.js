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
  //判断用户是否存在
  isExist: function(uid, callback){
    redis.exists('user:'+uid, callback);
  },
  //新增用户
  register: function(uid, params, callback) {
    redis.hmset('user:'+uid, params, callback);
  },
  //获取自增uid
  incrUid: function(callback){
    redis.incr('user:', callback);
  },
  //获取用户
  getUser: function(uid, callback){
    redis.hgetall('user:'+uid, callback);
  },
  //获取密码
  getPwd: function(uid, callback){
    redis.hget('user:'+uid, pwd, callback)
  },
  //验证密码
  verifyPwd: function(test, origin){
    crypto.pbkdf2(test, 'imcutesalt', 4096, 258, function(err, hash){
      if(err) throw new Error(err);
      return hash.toString('hex') == origin;
    })
  },
  //更新用户
  update: function(uid, param, callback) {
    redis.hset('user:'+uid, param, callback);
  },
  //增加用户位置
  geoadd: function(uid, longitude, latitude, callback){
    redis.geoadd('geo:user:', [longitude, latitude, uid]);
  },
  //获取用户位置
  getGeo: function(uid, callback){
    redis.geopos('geo:user:', uid, callback);
  },
  //打jwt值
  signToken: function(uid) {
    return jwt.sign(uid, 'ssssskey', {
      'expiresInMinutes': 1440*5 // 设置过期时间:5天
    })
  },
  //获取最大用户数
  getUserNum: function(callback){
    redis.get('user:', callback)
  }
}
