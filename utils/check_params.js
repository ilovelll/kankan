/**
 * Create by LiHongen on 2015/08/12
 * params checker
 */

'use strict';
var not_null_config = require('../config/db_config').not_null;//传参对数据库非空进行校验，配置
var _ = require('lodash');

module.exports = function (req, res, next) {
	var originalUrl = req.originalUrl;
	if (originalUrl.match(/users\/register/g)) {
		if (not_null_check(req, not_null_config.register_post)) {
			return next('params not null')
		}
	}
	if (originalUrl.match(/addLog/g)) {
		if (not_null_check(req, not_null_config.log)) {
			return next('params not null')
		}
	}
	if (originalUrl.match(/addAction/g)) {
		if (not_null_check(req, not_null_config.action)) {
			return next('params not null')
		}
	}
	next();
}

//校验非空字段
function not_null_check(req, template) {
	var originalFields = _.union(_.keys(req.query), _.keys(req.params), _.keys(req.body));
	return  _.difference(template, originalFields).length;
}
