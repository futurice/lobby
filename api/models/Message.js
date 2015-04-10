/**
* Message
*
* @description :: Represents a single message that is shown on the media screen
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    visibleUntil: {
      type: 'datetime',
    },
    forceVisible: {
      type: 'boolean',
      required: true
    },
    eventTime: {
      type: 'datetime'
    }
  },
};
