var colors = {
    // Hema Branding
    primary: '#d6652d',
    primaryhover: '#ae5022'
};

module.exports = {
    test: {
        colors: colors,
        selectors: {
            'caret-bottom-primary': [
                '.test-caret:before'
            ],
            'caret-bottom-primaryhover': [
                '.test-caret:after'
            ]
        }
    }
};
