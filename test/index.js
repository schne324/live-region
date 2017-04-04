'use strict';

describe('LiveRegion', function () {
  var polite = new LiveRegion();

  it('should create a region element', function () {
    assert.isDefined(polite.region);
  });

  it('should default to polite', function () {
    assert.equal(polite.region.getAttribute('aria-live'), 'polite');
  });

  describe('announcement', function () {
    it('should add an element with the provided text', function () {
      polite.announce('Hello');
      assert.equal(polite.region.firstChild.innerHTML, 'Hello');
    });

    it('should expire after the provided ms', function (done) {
      var r = new LiveRegion({ expire: 100 });
      r.announce('Hello');
      assert.equal(r.region.childElementCount, 1);
      setTimeout(function () {
        assert.equal(r.region.childElementCount, 0);
        done();
      }, 100);
    });
  });

});
