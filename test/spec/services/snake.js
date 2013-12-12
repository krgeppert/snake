'use strict';

describe('Service: Snake', function () {

  // load the service's module
  beforeEach(module('snakeApp'));

  // instantiate service
  var Snake;
  beforeEach(inject(function (_Snake_) {
    Snake = _Snake_;
  }));

  it('should do something', function () {
    expect(!!Snake).toBe(true);
  });

});
