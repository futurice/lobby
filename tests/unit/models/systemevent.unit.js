assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('systemevent model', function () {

    describe('add', function () {

        it('should create new system event', function (done) {

            var sysevent = {
                name: 'System Event Test'
            };
            SystemEvent.create(sysevent, function(err, data){
                if(err){
                    fail();
                }
                var id = data.id;
                describe('findOne()', function () {
                    it('should get newly created system event', function (done) {
                        SystemEvent.findOne({id:id} ,function (err, found) {
                            if(err){
                                fail();
                            }

                            assert.notEqual(found, undefined);
                            assert.equal(found.name, 'System Event Test');
                            
                            SystemEvent.destroy({id:id}).exec(function(err){
                                if(err){
                                    fail();
                                }
                            });

                            done();

                        });
                    });
                });
                done();
            });

        });
    });

});