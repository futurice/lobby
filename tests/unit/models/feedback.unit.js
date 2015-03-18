assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('feedback model', function () {

    describe('create', function () {

        var feedback = {
            comments: 'Feedback Unit Test'
        };

        it('should create new feedback', function (done) {

            Feedback.create(feedback, function(err, data){
                if(err){
                    fail();
                }
                id = data.id;
                it('find() should get newly created feedback', function (done) {
                    Feedback.find(feedback ,function (err, found) {
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

        it('should destroy the sample feedback', function (done) {
            Feedback.destroy(feedback).exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });
    });

});