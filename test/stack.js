var assert = require('chai').assert,
    expect = require('chai').expect,
	should = require('chai').should(),
    test = require('selenium-webdriver/testing'),
    testSec = require('selenium-webdriver/testing'),
    //until = require('selenium-webdriver'),
    webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
	firefox = require('selenium-webdriver/firefox'),
    //path = require('chromedriver').path,
    //service = new chrome.ServiceBuilder(path).build(),
    driver;
	

test.describe('First test', function(done) {
	
    this.timeout(30000);
	
		test.before(function (done) {
        //new chrome instance (opnes new chrome window)
		driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        //go to loan web
        driver.get("http://stackoverflow.com");
        //wait till page is loaded
        driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//a[@class='login-link']"));
        }, 10000);
        //maximize the window
        driver.manage().window().maximize();
        done();
		});
	
	    test.after(function (done) {
        //close the browser instance
        driver.close();
        driver.quit();
        //service.stop();
        done();
		});
		
    test.it('Search stackoverflow', function(done) {
        //find and fill search field
        driver.findElement(webdriver.By.name("q")).then(function (search) {
            search.clear();
            search.sendKeys("XPath to select Element");
        });
        //click search button
        //driver.findElement(webdriver.By.xpath("//input[@name='q']")).sendKeys(13);
		driver.findElement(webdriver.By.xpath("//input[@name='q']")).submit();

        //wait till result table is loaded
        driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//div[@class='subheader results-header']"));
        }, 10000);
        
        
        //add assertion

		var searchResults = driver.findElement(webdriver.By.xpath("//input[@type='submit']"));
		searchResults.getAttribute('value').then(function(value) {
		assert.equal(value, 'search');
		    });
		
		driver.sleep(3000);

        done();
    });
	
	test.it('Login error', function(done) {
     
        //open login page
        driver.findElement(webdriver.By.xpath("//a[@class='login-link'][2]")).click();
		
        //wait till login page is loaded
        driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//div[@id='login-page']"));
        }, 10000);
		
        //fill username
        driver.findElement(webdriver.By.name("email")).then(function (email) {
            email.clear();
            email.sendKeys("user@test.com");
        });
        //fill password
        driver.findElement(webdriver.By.name("password")).then(function (password) {
            password.clear();
            password.sendKeys("pass");
        });
        //click submit button
        driver.findElement(webdriver.By.xpath("//input[@id='submit-button']")).click();
		
        //add assertion
		//var errorMessage = driver.findElement(webdriver.By.xpath("//div[@style='color:red']/text()"));
		//var errorMessage = driver.findElement(webdriver.By.name('b'));
		driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//div[@class='message-text']"));
        }, 10000);
		
		var errorClose = driver.findElement(webdriver.By.xpath("//div[@title='close this message (or hit Esc)']"));
		errorClose.getAttribute('title').then(function(title) {
			assert.equal(title, 'close this message (or hit Esc)');
		    });

		var errorCloseClass = driver.findElement(webdriver.By.xpath("//div[@class='message-close']"));
		errorCloseClass.getAttribute('class').then(function(classf) {
			assert.equal(classf, 'message-close');
		    });
			
		var errorMessageClass = driver.findElement(webdriver.By.xpath("//div[@class='message-text']"));
		errorMessageClass.getAttribute('class').then(function(classf) {
			assert.equal(classf, 'message-text');
		    });	
			
		// var errorMessage = driver.findElement(webdriver.By.xpath("//div[@class='message-text']/text()"));
		/* var errorMessage = driver.findElement(webdriver.By.xpath("//div[@class='message-text']"));
		errorMessage.getAttribute('text').then(function(text) {
			assert.equal(text, 'The email or password is incorrect.');
		    });	 */


		
	
		driver.sleep(3000);

        done();
    });
});