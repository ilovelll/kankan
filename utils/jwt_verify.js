/**
 * Create by LiHongen on 2015/08/12
 * jwt verify.
 */

'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'kankan_server', function (err, decoded) {
      if (err) {
        return res.json({ success: false, msg: 'token信息错误.' });
      } else {
        req.token_msg = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: '没有提供token!'
    })
  }
}
