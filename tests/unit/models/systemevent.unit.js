assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('systemevent model', function () {

    describe('add', function () {

        var sysevent = {
            name: 'System Event Test'
        };

        it('should create new system event', function (done) {
            
            SystemEvent.create(sysevent, function(err, data){
                if(err){
                    fail();
                }
                id = data.id;
                
                it('find() should get newly created system event', function (done) {
                    SystemEvent.find(sysevent, function (err, found) {
                        if(err){
                            fail();
                        }

                        assert.notEqual(found, undefined);
                        assert.notDeepEqual(found, []);
                    });
                    done();
                });
            });
            done();
        });

        it('should destroy the sample system event', function (done) {
            SystemEvent.destroy(sysevent).exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });
    });

});