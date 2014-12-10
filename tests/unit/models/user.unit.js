//var User = require('../../../api/models/User'),
// sinon = require('sinon'),
    assert = require('assert'),
    should = require('should'),
    Sails = require('sails');

describe('openspace user model', function () {

    describe('create', function () {

        it('should create new openspace user', function (done) {

            var sampleuser = {
                phone: '02948127519212',
                email: 'j.ketkupolkka@pulttibois.fi',
                last_name: 'Potkukelkka',
                first_name: 'James',
            };
            User.create(sampleuser, function(err, data){
                if(err){
                fail();
                } 
                describe('findOne()', function () {
                    it('should get newly created user', function (done) {
                        User.findOne({phone:'02948127519212'} ,function (err, found) {

                            assert.notEqual(found, undefined);
                            
                            User.destroy({phone:'02948127519212'});
                            done();

                        });
                    });
                });
            done();
            });

        });
    });

});

