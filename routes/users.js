var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var async = require('async');
var User = require('../models/User');
var geohash = require('ngeohash');
/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});
router.route('/register')
.get(function(req, res, next) {
  res.send('Have Not Complete!')
})
.post(function(req, res, next) {
  //解析用户地理位置
  var loc = geohash.decode(req.body.geohash);
  async.auto({
    format_pwd: function(callback){
      crypto.pbkdf2(req.body.pwd, 'imcutesalt', 1024, 128, function(err, hash){
        if(err) return next(err);
        callback(null, hash.toString('hex'));
      });
    },
    isExist: function(callback){
      User.isExist(req.body.name, callback)
    },
    getUid: ['isExist', function(callback, result) {
      if(result.isExist){
        return res.send({
          success: false,
          msg: "用户名已存在！"
        })
      }
      User.incrUid(callback);
    }],
    saveUser: ['getUid','format_pwd', function(callback, result) {
      req.body.pwd = result.format_pwd;
      var uid = result.getUid;
      User.register(uid, req.body, callback)
    }]
  }, function(err, result){
    if(err) return next(err);
    console.log(result)
    res.send('----');
  })
})
module.exports = router;
