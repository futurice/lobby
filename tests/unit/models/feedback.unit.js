assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('feedback model', function () {

    describe('create', function () {

        it('should create new feedback', function (done) {

            var feedback = {
                comments: 'Feedback Unit Test'
            };
            Feedback.create(feedback, function(err, data){
                if(err){
                    fail();
                }
                var id = data.id;
                describe('findOne()', function () {
                    it('should get newly created feedback', function (done) {
                        Feedback.findOne({id:id} ,function (err, found) {

                            assert.notEqual(found, undefined);
                            assert.equal(found.comments, 'Feedback Unit Test');
                            
                            Feedback.destroy({id:id});
                            done();

                        });
                    });
                });
                done();
            });

        });
    });

});