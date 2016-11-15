var generator = require('yeoman-generator');

module.exports = generator.Base.extend({
    constructor: function() {
        generator.Base.apply(this, arguments);
    },
    console: function() {
        generator.log("Testing");
    }
});