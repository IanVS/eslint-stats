'use strict';
describe('formatUtils', function() {
  var formatUtil = require('../util/formatUtil');
  var _ = require('lodash');
  var eslintResults = [{
    filePath: 'path1',
    messages: [
      {
        ruleId: 'id1',
        severity: 2
      },
      {
        ruleId: 'id2',
        severity: 2
      }
    ]
  },
  {
    filePath: 'path2',
    messages: [
      {
        ruleId: 'id1',
        severity: 2
      }
    ]
  }
  ];

  it('should return an empty object for empty array results', function() {
    expect(formatUtil.getErrorObject([])).toEqual({});
  });

  it('should return an aggregated error object', function() {
    var errorObj = formatUtil.getErrorObject(eslintResults);
    expect(Object.keys(errorObj).length).toBe(2);
    expect(errorObj.id1).toBe(2);
    expect(errorObj.id2).toBe(1);
  });

  it('should not aggregate warnings', function() {
    var warningResult = {
      filePath: 'path3',
      messages: [
        {
          ruleId: 'id1',
          severity: 1
        }
      ]
    };
    var resultsWithWarning = _.union(eslintResults, [warningResult]);
    var errorObj = formatUtil.getErrorObject(resultsWithWarning);
    expect(Object.keys(errorObj).length).toBe(2);
    expect(errorObj.id1).toBe(2);
    expect(errorObj.id2).toBe(1);
  });
});
