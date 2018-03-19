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

    test.it('Sign In', function() {
        // Set timeout to 15 seconds
        this.timeout(15000);

        var email = 'kelvin+interview@example.com',
            password = 'XcXLVTkh$TToAF6';

        // Get driver
        var driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

        // Go to URL
        driver.get('https://www.dronedeploy.com/app2/signin');

        // clicks signin button
        driver.findElement(webdriver.By.id('sign-in-email')).sendKeys(email)
        .then(() => {
            //input password
            driver.findElement(webdriver.By.id('sign-in-password')).sendKeys(password);
        })
        .then(() => {
            //submits the form
            driver.findElement(webdriver.By.id('sign-in-dd-button')).click();
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
        .then(() => {
            driver.findElement(webdriver.By.xpath('/html/body/app/div/sidebar/mat-sidenav-container/mat-sidenav/div[1]/div/dashboard/section/folder-dashboard/div[2]/record-manager[3]/div/record-card/div')).click();
        })
        .then(() => {
            driver.findElement(webdriver.By.xpath('/html/body/app/div/sidebar/mat-sidenav-container/mat-sidenav/div[1]/div/data/data-overview/sidebar-section[3]/div/annotations/section/annotation-controls/section[2]/annotation-button[1]')).click();
        })
        .then(() => {
            driver.actions({bridge: true}).move({x: 0, y: 0, origin: 'leaflet-tile_leaflet-tile-loaded'}).perform();
        })



        // Quit webdriver
        //driver.quit();
    });
});
