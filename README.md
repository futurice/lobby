# Electronic Receptionist

Web application to welcome and guide visitors arriving to the Futurice office in Kamppi, Helsinki. Built on [Sails.js](http://sailsjs.org) and [Angularjs](http://www.angularjs.org).

# Getting Started #

Before you begin, you should make sure you have installed all these prerequisites on your development machine.
[Sails website](http://sailsjs.org/#/getStarted) also has instructions on how to install Node & Sails.

####Node.js & npm#####
Download & Install Node.js and the npm package manager.

####MongoDB####
Download & Install MongoDB, and make sure it's running on the default port (27017).

####Bower####
We're going to use the Bower Package Manager to manage the front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

    $ npm install -g bower

####Grunt####
We're going to use the Grunt Task Runner to automate the development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

    $ npm install -g grunt-cli
Note: Your user might not have the permissions to install package globally, so use a super user or sudo or run with admin privileges for windows command


Ensure you have Sails installed on your machine by executing the following commands:

    $ sudo npm install sails -g


This will install the CLI globally.  Once you have the Sails CLI installed, proceed to execute the following:


    $ git clone https://github.com/futurice/lobby.git
    $ cd into repo folder
    $ npm install
    $ bower install

This will install all client and server side packages needed.  Upon succesfully running the commands above, you are ready to run the app. At the root of the project run the following

    $ sails lift

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
MEANS asset pipeline is streamlined, including additional AngularJS or other frameworks and libraries is as easy as modifying the file located at *tasks/pipeline.js*

## Grunt ##
Grunt is included with various tasks including concat, minifying, less compiling and uglify, but it is not required.  For more detail, view tasks/README.md

## Unit and e2e Testing (Client-side and Server-side) ##
We've integrated Grunt Tasks for MochaJS unit testing.

#### MochaJS Unit Testing ####
Just use the following command for MochaJS Unit Testing

    $ grunt test:unit

#### Protractor end-to-end Testing ####
Just use the following command for end-to-end testing

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
