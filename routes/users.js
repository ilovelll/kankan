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
        User.register(result.getUid, req.body, callback)
      }],
      saveName: ['saveUser', 'getUid', function(callback, result) {
        User.saveName(result.getUid, req.body.name, callback);
      }],
      saveLoc: ['saveUser','getUid', function(callback, result) {
        if(result.saveUser){
          User.geoAdd(result.getUid, loc.longitude, loc.latitude, callback)
        }
      }]
    }, function(err, result){
      if(err) return next(err);
      res.send({
        success: true,
        uid: result.getUid,
        msg: "注册用户成功!"
      })
    })
  })

router.route('/token')
  .post(function(req, res, next) {
    async.auto({
      getPwd: function(callback) {
        User.getPwd(req.body.uid, callback);
      },
      verifyPwd: ['getPwd', function(callback, result){
        if(!result.getPwd){
          return res.send({
            success: false,
            msg:"用户id不存在！"
          })
        }
        User.verifyPwd(req.body.pwd, result.getPwd, callback);
      }],
      signToken:['verifyPwd', function(callback, result){
        if(!result.verifyPwd){
          return res.json({
            success: false,
            msg: "密码错误"
          })
        }
        callback(null, User.signToken(req.body.uid));
      }]
    }, function(err, result) {
      if(err) return next(err);
      if(result.signToken){
        res.json({
          success: true,
          token: result.signToken
        })
      } else {
        return next('get error');
      }
    })
  })

router.route('/:uid')
  .put(function(req, res, next) {
    var uid = parseInt(req.params.uid);
    
  })
module.exports = router;
