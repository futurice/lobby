/**
 * Helper functions
 */
module.exports = {
  isValidTimestamp: function(d) {
    return !isNaN(d) && d > 0;
  }
};
