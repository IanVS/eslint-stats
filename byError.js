'use strict';
var _ = require('lodash');

module.exports = function(results) {
  var statsUtil = require('./util/statsUtil');
  var displayUtil = require('./util/displayUtil');

  var errorObj = _.filter(statsUtil.getReportObjArray(results), {severity: 2});
  return displayUtil.getObjectOutput(errorObj);
};
