'use strict';

var SG = require('strong-globalize');
SG.SetRootDir(__dirname);

module.exports = require('./lib/redis');
