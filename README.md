# Electronic Receptionist [![Build Status](https://travis-ci.org/futurice/lobby.svg?branch=master)](https://travis-ci.org/futurice/lobby)

Web application to welcome and guide visitors arriving to the Futurice office in Kamppi, Helsinki. Built on [Sails.js](http://sailsjs.org) and [Angularjs](http://www.angularjs.org).

# Getting Started #

Before you begin, you should make sure you have installed all these prerequisites on your development machine.
[Sails website](http://sailsjs.org/#/getStarted) also has instructions on how to install Node & Sails.

####Node.js & npm#####
Download & Install Node.js and the npm package manager.

####MongoDB####
Download & Install MongoDB, and make sure it's running on the default port (27017).

####Ruby & SASS####
Download & Install Ruby and the SASS preprocessor. Follow [these instructions](http://sass-lang.com/install), or if you already have Ruby installed, just do

    $ gem install sass

####Bower####
We use the Bower Package Manager to manage the front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

    $ npm install -g bower

####Grunt####
We use the Grunt Task Runner to automate the development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

    $ npm install -g grunt-cli
Note: Your user might not have the permissions to install package globally, so use a super user or sudo or run with admin privileges in Windows.


Ensure you have Sails installed on your machine by executing the following commands:

    $ sudo npm install sails -g


This will install the CLI globally.  Once you have the Sails CLI installed, proceed to execute the following:


    $ git clone https://github.com/futurice/lobby.git
    $ cd into repo folder
    $ npm install
    $ bower install

This will install all client and server side packages needed.  Upon succesfully running the commands above, you are ready to run the app.

# Running the application #

At the root of the project, run the following

    $ sails lift

To run using production configuration with asset minification, use

    $ sails lift --prod

View the app on your local machine at [http://localhost:1337](http://localhost:1337)


#Folder Structure #

```
├── api                 -- server-side
│   ├── controllers
│   ├── models
│   ├── policies
│   ├── responses
│   └── services
├── assets              -- client-side
│   ├── bower_components
│   ├── fonts
│   ├── images
│   ├── src             -- AngularJS components
├     |── app
    |-- common
      |-- directives
      ├── models
      ├── services
│   └── styles
├── config              -- SailsJS Configuration
│  
 ├── node_modules
│  
├── tasks                 -- Grunt Tasks
│   ├── config
│   └── register
├── tests                -- Testing Scripts
│   ├── e2e
      |-- controllers
│   └── unit
      |-- adapters
      ├── controllers
      ├── models
      ├── policies
      ├── services
   ├── views
│   ├── auth
│   ├── home
│   └── layouts

```

# Features #

## Asset Management ##
The asset pipeline is streamlined, so including additional AngularJS or other frameworks and libraries is as easy as modifying the file located at *tasks/pipeline.js*

## Grunt ##
Grunt is included with various tasks including concat, minifying, sass compiling and uglify, but it is not required.  For more detail, view tasks/README.md

## Unit and e2e Testing (Client-side and Server-side) ##
We've integrated Grunt tasks for MochaJS unit testing.

#### MochaJS Unit Testing ####
Just use the following command to run the MochaJS unit tests

    $ grunt test:unit

#### Protractor end-to-end Testing ####
Just use the following command to run the Protractor end-to-end tests

    $ grunt protractor

# Development workflow

* We use [Feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
* Don't commit straight to master, instead create a feature branch from master, `git checkout -b my-new-feature`
* Commit with clear commit messages (in English) and push incrementally, not all at once.
  * `git commit -m "Fixed bug x"`
  * `git push origin my-new-feature`
* In case master has been updated while you're working your feature, you can rebase or merge the changes into your feature branch if needed
* Remember to write tests and make sure all tests pass when you're finished with your feature
* Once feature is finished, push your changes and create a pull request in GitHub
* Don't merge your own features, someone else should review them


# Notification settings

Used settings are stored in config/futurice.sample.js in json format.
The different options are listed below, and after that there is a sample file.
    
    sms_user: This is the username for Futurice's sms system
    sms_password: And this is the password
    sms_override_number: This is used in testing. If specified, overrides any chosen number. Leave blank when in production.
    
    flowdock_key: This is users api-key to flowdock, so it can send messages directly to people
    flowdock_flow_api_key: This is api-key to a single flow, allows sending messages without setupping a user

Sample file:

    module.exports.futurice = {
      sms_user: "foo",
      sms_password: "bar",
      sms_override_number: "+35840999999",
      flowdock_key: "asdgasdg",
      flowdock_flow_api_key: "sdfgh9s6dasdasfa25wq2"
    };