erb'use strict';

describe('Deliveries', function () {

  var deliveryButton;

  it('should show delivery button in main navigation', function () {

    browser.get("/").then(function() {
      deliveryButton = element(by.css('.main-nav li:nth-child(2) a'));
      expect(deliveryButton.getText()).toEqual('Deliveries');
      deliveryButton.click();
    });
  });

  it('allow the user to send notification when bringing a delivery', function () {

    element(by.css('h2')).then(function (header) {
      expect(header.isDisplayed()).toBe(true);
      expect(header.getText()).toEqual('Bringing a delivery?');
    });
  });
});
/*
describe('Open Space', function () {

  var menuButton;
  var email;
  var phone;
  var registerButton;
  var checkinButton;
  var checkinURL = "/openspace/checkin";
  var registerURL = "/openspace/register";

  describe('Checkin', function () {

    beforeEach(function() {
      browser.get(checkinURL).then(function() {
        checkinButton = element(by.css('form .button.success');
      });
    });

    it('should show error when trying with invalid details', function () {
      checkinButton.click();
      expect(error.getText()).toMatch('missing details');

      phone.sendKeys('123123789');
      expect(error.getText()).toMatch('invalid email');
    });

    it('should accept valid input', function() {

      email.sendKeys('test@example.com');
      phone.sendKeys('123');
      checkinButton.click();
      expect(browser.getCurrentUrl()).not.toEqual(checkinURL);
    });
  });

});
*/