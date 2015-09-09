var tap = require('tap');
 
tap.test('inspectReactElement produces desired output', function (t) {
  t.plan(1);
  var inspectReactElement = require('../');
  var React = require('react');

  t.equal(inspectReactElement(React.createElement('div')), '<div />');
});
