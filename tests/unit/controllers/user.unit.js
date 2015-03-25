/*
var UserController = require('../../../api/controllers/UserController'),
sinon = require('sinon'),
assert = require('assert'),
Sails = require('sails'),
app;

before(function (done) {

    this.timeout(5000);

    Sails.lift({

        log: {
            level: 'error'
        },

        adapters: {
            'default': 'someMongodbServer',
           MongodbServer: {
                adapter   : 'sails-mongo',
                host      : 'localhost',
                port      : 27017,

                database: 'means-seed'
            }
        }

    }, function (err, sails) {
        app = sails;
        done(err, sails);
    });
});


after(function (done) {
    app.lower(done);
});


describe('UserController', function () {
    var json = sinon.spy();
    var req = {};
    var res = {json:json};

    describe('when we create a user', function () {

        var sampleuser = {
            phone: '02948127519212',
            email: 'j.ketkupolkka@pulttibois.fi',
            last_name: 'Potkukelkka',
            first_name: 'James',
        };
        req.param = sampleuser;

        UserController.create(req, res);
        it('should respond succesfully', function() {
            assertEqual(res.msg, "user created successfully!");
        });

        it('findOne() should get newly created user', function (done) {
            User.findOne({phone:'02948127519212', last_name:'Potkukelkka', first_name:'James'},
              function (err, found) {

                assert.notEqual(found, undefined);
                assert.notDeepEqual(found, []);
            });
            done();
        });

        it('should create new system event of user creation', function (done) {
            SystemEvent.find({name:"UserCreate", details:sampleuser.first_name+' '+sampleuser.last_name}, 
                function (err, found) {
                    if(err){
                        fail();
                    }
                    assert.notEqual(found, undefined);
                    assert.notDeepEqual(found, []);
                }
            );
            done();
        });

        it('todo: should create an openspacelog entry'), function (done) {
            done();
        }

        it('should destroy the system event from database', function (done) {
            SystemEvent.destroy({name:"UserCreate", details:sampleuser.first_name+' '+sampleuser.last_name})
              .exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });

        it('todo: should destroy the openspacelog entry from database'), function (done) {
            done();
        }

        it('should destroy the sample user from database', function (done) {
            User.destroy({phone:'02948127519212', last_name:'Potkukelkka', first_name:'James'})
              .exec(function(err, deleted){
                if(err){
                    fail();
                }
                assert.notDeepEqual(deleted, []);
            });
            done();
        });
    });
});
*/