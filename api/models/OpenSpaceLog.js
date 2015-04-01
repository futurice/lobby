/**
 * openspace log
 *
 * @module      :: Model
 * @description :: Represents one openspace login
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user'
    },
    comment: {
      type: 'string',
      required: false,
    }
  }
}
