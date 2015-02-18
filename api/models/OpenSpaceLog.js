/**
 * openspace log
 *
 * @module      :: Model
 * @description :: Represents one openspace login
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    userid: {
      type: 'string',
      required: true,
      unique: true,
    },
    timestamp: {
      type: 'string',
      required: true,
    },
    comment: {
      type: 'string',
      required: false,
    }
  }
}
