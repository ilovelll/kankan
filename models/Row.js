/**
 * Create by LiHongen on 2015/08/12 * Row model. */'use strict';var Redis = require('ioredis');var options = require('../config/db_config').Row_Redis;var redis = new Redis(options);