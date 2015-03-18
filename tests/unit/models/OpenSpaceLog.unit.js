assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('OpenSpaceLog model', function () {

    describe('add', function () {

        it('should create new OpenSpaceLog event', function (done) {

            var opevent = {
                userid: 'OpenSpaceLog Event Test',
                timestamp: '18.03.2015'
            };
            OpenSpaceLog.create(opevent, function(err, data){
                if(err){
                    fail();
                }
                var id = data.id;
                describe('findOne()', function () {
                    it('should get newly created OpenSpaceLog event', function (done) {
                        OpenSpaceLog.findOne({id:id} ,function (err, found) {
                            if(err){
                                fail();
                            }

                            assert.notEqual(found, undefined);
                            assert.equal(found.userid, 'OpenSpaceLog Event Test');
                            
                            OpenSpaceLog.destroy({id:id});
                            done();

                        });
                    });
                });
                done();
            });

        });
    });

});