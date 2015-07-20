//var casper = require('casper').create();
casper.instanceURL = 'http://localhost:8081/';
casper.options.waitTimeout = 20000;

casper.start(casper.instanceURL, function () {
    this.echo(this.getTitle());
});

casper.test.begin('Check if content is loaded', function suite(test) {
    casper.start(casper.instanceURL, function () {

        var initialText = 'Header text';

        this.waitForText(initialText, function () {
            test.assertTextExists(initialText);
        });

        casper.waitForSelector('.three', function() {
            test.assertExists('.three');
        });
    });
})

casper.run();