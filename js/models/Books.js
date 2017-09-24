app.models.Books = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.options = options;
        this.catId = this.options.catId;
    },

    url: function() {
        return 'api/books_' + this.catId + '.json';
    },
});