assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('OpenSpaceLog model', function () {

    describe('create', function () {

        var opevent = {
            userid: 'OpenSpaceLog Event Test',
            timestamp: '18.03.2015'
        };
        var id;

        it('should create new OpenSpaceLog event', function (done) {

            OpenSpaceLog.create(opevent, function(err, data){
                if(err){
                    fail();
                }
                id = data.id;
                it('findOne() should get newly created OpenSpaceLog event', function (done) {
                    OpenSpaceLog.findOne({id:id, userid: 'OpenSpaceLog Event Test', timestamp: '18.03.2015'},
                      function (err, found) {
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

        it('should delete the OpenSpaceLog sample event', function (done) {
            OpenSpaceLog.destroy({id:id}).exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });
    });

});