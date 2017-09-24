app.routers.Router = Backbone.Router.extend({
    routes: {
        'category/:id/book/:bookId': 'book',    //#category/<something>/book/<something>
        'category/:id': 'category',             //#category/<something>
        '': 'home',
        '*default': 'unknown'
    },

    home: function() {
        console.log("Home");
    },

    category: function(id) {
        console.log("category " + id);

        app.data.books = new app.models.Books(null, {catId: id});
        console.log(app.data.books.url());

        app.data.currentView = new app.views.BooksList({
            collection: app.data.books
        });

        app.data.books.fetch();
    },

    book: function(id, bookId) {
        console.log("book " + bookId + " for category " + id);
    },

    unknown: function() {
        console.log("Unknown route...");
    }
});
