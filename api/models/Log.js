/**
 * Log
 *
 * @module      :: Log
 * @description :: Represents a single log entry
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		phone: {
            type: 'string',
            required: true,
            unique:true,
        },
         email: {
			type: 'email',
			required: true,
		},
		first_name: {
			type: 'string',
			required: true
		},
        last_name: {
            type: 'string',
            required: true
        }
    }
}
