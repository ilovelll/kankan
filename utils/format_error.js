/**
 * Create by LiHongen on 2015/08/06.
 * Format error message.
 */
'use strict';
var error_message = require('../config/error_msg.json');
var debug = require('debug')('kankan:server');

// 格式化错误输出
module.exports = function (error) {
  debug('----------[ERROR]----------');
  debug(error);
  debug('----------[ERROR]----------');

  return getMsg(error.toString()) || '程序异常';
};

function getMsg(source) {
  for (var i in error_message.error_index) {
    if (source.indexOf(error_message.error_index[i]) != -1) {
      return error_message[error_message.error_index[i]];
    }
  }
}
