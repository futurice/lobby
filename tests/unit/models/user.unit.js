//var User = require('../../../api/models/User'),
// sinon = require('sinon'),
assert = require('assert'),
should = require('should'),
Sails = require('sails');

describe('openspace user model', function () {

    describe('create', function () {

        var sampleuser = {
            phone: '02948127519212',
            email: 'j.ketkupolkka@pulttibois.fi',
            last_name: 'Potkukelkka',
            first_name: 'James',
        };
        var id;

        it('should create new openspace user', function (done) {
            
            User.create(sampleuser, function(err, data){
                if(err){
                    fail();
                } 
                id = data.id;
                it('findOne() should get newly created user', function (done) {
                    User.findOne({phone:'02948127519212'} ,function (err, found) {

                        assert.notEqual(found, undefined);
                        assert.notDeepEqual(found, []);
                    });
                    done();
                });
            });
            done();
        });
        
        it('should delete the openspace sample user', function (done) {
            User.destroy({id:id}).exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });
    });

});

