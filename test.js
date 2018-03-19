// Load dependecies
var assert = require('chai').assert,
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    should = require('should'),
    url = 'https://';

// Our test
test.describe('Drone Deploy - ', function() {
    test.it('Navigate to Drone Deploy site', function() {
        // Set timeout to 10 seconds
        this.timeout(15000);

        // Get driver
        var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

        // Go to URL
        driver.get('http://www.dronedeploy.com');

        // Find title and assert
        driver.executeScript('return document.title').then(function(return_value) {
            assert.equal(return_value, 'Powerful Drone & UAV Mapping Software | DroneDeploy')
        });

        // Quit webdriver
        driver.quit();
    });

    test.it('Create account', function() {
        // Set timeout to 15 seconds
        this.timeout(15000);

        //generates random email
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var string = '';
        for(var i = 0; i < 4; i++) {
            string += chars[Math.floor(Math.random() * chars.length)];
        }
        console.log('Generated email is: ' + string + '@mail.com');

        var firstName = 'Kelvin',
            lastName = 'Reid',
            email = (string + '@mail.com'),
            company = 'Test Company',
            phoneNumber = '757-555-5555',
            password = 'Qwerty123!';

        // Get driver
        var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

        // Go to URL
        driver.get('http://www.dronedeploy.com');

        // clicks signup button
        driver.findElement(webdriver.By.xpath('//*[@id="inner-wrap"]/nav[1]/div/ul/li[7]/a')).click()
        .then(() => {
            //input first name
            driver.findElement(webdriver.By.id('name')).sendKeys(firstName);
        })
        .then(() => {
            //input last name
            driver.findElement(webdriver.By.id('last')).sendKeys(lastName);
        })
        .then(() => {
            //input username
            driver.findElement(webdriver.By.id('username')).sendKeys(email);
        })
        .then(() => {
            //input organization
            driver.findElement(webdriver.By.id('company')).sendKeys(company);
        })
        .then(() => {
            //input phone number
            driver.findElement(webdriver.By.id('phone')).sendKeys(phoneNumber);
        })
        .then(() => {
            // click the industry dropdown
            driver.findElement(webdriver.By.className('select-dropdown')).click();
        })
        .then(() => {
            // finds the options
            driver.findElement(webdriver.By.className('dropdown-content select-dropdown active')).click();
        })
        .then(() => {
            // selects industry
            driver.findElement(webdriver.By.className('selected')).click();
        })
        .then(() => {
            //input password
            driver.findElement(webdriver.By.id('password')).sendKeys(password);
        })
        .then(() => {
            //confirm password
            driver.findElement(webdriver.By.id('confirm_password')).sendKeys(password);
        })
        .then(() => {
            //submits the form
            driver.findElement(webdriver.By.id('submit')).click();
        })
        .then(() => {
            // wait for the dashboard to load and get the URL
            driver.sleep(5000);
            return driver.getCurrentUrl();
        })
        .then((url) => {
            // verify the URL contains dashboard
            should(url).containEql('/app2/dashboard');
        })

        // Quit webdriver
        driver.quit();
    });
});
