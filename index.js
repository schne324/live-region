'use strict';

/**
 * Creates the region
 * @param {Object} options The following configuration options:
 * @option {String} `ariaLive`: "polite" or "assertive" (defaults to "polite")
 * @option {String} `role`: "status", "alert", or "log" (defaults to "log")
 * @option {String} `ariaRelevant`: "additions", "removals", "text", "all",
 *         or "additions text" (defaults to "additions")
 * @option {String} `ariaAtomic`: "true" or "false" (defaults to "false")
 * @option {Number} `expire`: The number of ms before removing the announcement
 *         node from the live region. This prevents the region from getting full
 *         of useless nodes (defaults to 7000)
 */

function LiveRegion(options) {
  this.region = document.createElement('div');
  this.options = options || {};
  // set attrs / styles
  this.configure();
  // append it
  document.body.appendChild(this.region);
}

/**
 * configure
 * Sets attributes and offscreens the region
 */

LiveRegion.prototype.configure = function () {
  var opts = this.options;
  var region = this.region;
  // set attributes
  region.setAttribute('aria-live', opts.ariaLive || 'polite');
  region.setAttribute('role', opts.role || 'log');
  region.setAttribute('aria-relevant', opts.ariaRelevant || 'additions');
  region.setAttribute('aria-atomic', opts.ariaAtomic || 'false');

  // offscreen it
  this.region.style.position = 'absolute';
  this.region.style.width = '1px';
  this.region.style.height = '1px';
  this.region.style.marginTop = '-1px';
  this.region.style.clip = 'rect(1px, 1px, 1px, 1px)';
};

/**
 * announce
 * Creates a live region announcement
 */

LiveRegion.prototype.announce = function (msg) {
  var announcement = document.createElement('div');
  announcement.innerHTML = msg;
  // add it to the offscreen region
  this.region.appendChild(announcement);

  if (this.options.expire || typeof this.options.expire === 'undefined') {
    setTimeout(function () {
      this.region.removeChild(announcement);
    }.bind(this), this.options.expire || 7e3); // defaults to 7 seconds
  }
};

/**
 * Expose LiveRegion
 */

if (typeof module !== 'undefined') {
  module.exports = LiveRegion;
}
