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
	

test.describe('Login', function(done) {
	
    this.timeout(30000);
	
		test.before(function (done) {
        //new chrome instance (opnes new chrome window)
		driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        //go to home 
        driver.get("http://584-kooth.dev2.despark.com");
        //wait till page is loaded
        driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//a[@class='js-hide-until-loaded']"));
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
		
    test.it('Login in header', function(done) {
        //Find the Login button in the header and click on it
        driver.findElement(webdriver.By.xpath ("//a[@class='Button is-yellow is-small js-login-button']")).click();
		
	    driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//input[@id='login-username']"));
        }, 10000);	
		
		//enter username 
		driver.findElement(webdriver.By.xpath("//input[@id='login-username']")).then(function (usernameHeader) {
            usernameHeader.clear();
            usernameHeader.sendKeys("barzashka");
        });
		
		//enter password 
		driver.findElement(webdriver.By.xpath("//input[@id='login-password']")).then(function (passwordHeader) {
            passwordHeader.clear();
            passwordHeader.sendKeys("Asdasd11");
        });
		
        //click submit button
		driver.findElement(webdriver.By.xpath("//input[@value='Submit']")).submit();
		
		//verify login
		var myUser = driver.findElement(webdriver.By.xpath("//div[@class='username']"));
		myUser.getAttribute('value').then(function(value) {
		assert.equal(value, 'barzashka');
		    });
		
		//logout
		driver.findElement(webdriver.By.xpath("//div[@class='username']")).click();
		driver.findElement(webdriver.By.xpath("//div[@class='Link is-half-opaque']")).click();
		
		driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//div[@class='Button is-yellow is-small js-login-button']"));
        }, 10000);	
		
		driver.sleep(3000);

        done();
    });
	
	test.it('Login in need to talk section', function(done) {
     
		//Find the Login button in "Need to talk" section and click on it
        driver.findElement(webdriver.By.xpath ("//a[@class='Button is-yellow chat-link-chat']")).click();
		
	    driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//input[@id='login-username']"));
        }, 10000);	
		
		//enter username 
		driver.findElement(webdriver.By.xpath("//input[@id='login-username']")).then(function (usernameHeader) {
            usernameHeader.clear();
            usernameHeader.sendKeys("barzashka");
        });
		
		//enter password 
		driver.findElement(webdriver.By.xpath("//input[@id='login-password']")).then(function (passwordHeader) {
            passwordHeader.clear();
            passwordHeader.sendKeys("Asdasd11");
        });
		
        //click submit button
		driver.findElement(webdriver.By.xpath("//input[@value='Submit']")).submit();
		
		//verify login
		var myUser = driver.findElement(webdriver.By.xpath("//div[@class='username']"));
		myUser.getAttribute('value').then(function(value) {
		assert.equal(value, 'barzashka');
		    });
		
		//logout
		driver.findElement(webdriver.By.xpath("//div[@class='username']")).click();
		driver.findElement(webdriver.By.xpath("//div[@class='Link is-half-opaque']")).click();
		
		driver.wait(function () {
            return driver.isElementPresent(webdriver.By.xpath("//div[@class='Button is-yellow is-small js-login-button']"));
        }, 10000);	
	
		driver.sleep(3000);

        done();
    });
});