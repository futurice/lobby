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
                                User.destroy({phone:'02948127519212'});
                            assert.notEqual(found, undefined);
                            
                            
                            done();

                        });
                    });
                });
            done();
            });

        });
    });

});

describe('openspace user model', function () {

    describe('create', function () {

        it('should create new openspace user with no email', function (done) {

            var sampleuser2 = {
                phone: '02948127519213',
                email: '',
                last_name: 'Snow',
                first_name: 'Jon',
            };
            User.create(sampleuser2, function(err, data){
                if(err){
                fail();
                } 

                describe('findOne()', function () {
                    it('should get newly created user', function (done) {
                        User.findOne(sampleuser2 ,function (err, found) {

                            assert.notEqual(found, undefined);

                            User.destroy(sampleuser2);
                            done();

                        });
                    });
                });
            done();
            });

        });
    });

});