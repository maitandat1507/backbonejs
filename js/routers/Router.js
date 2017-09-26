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

        // param models = null b/c we get models data from server APIs
        app.data.books = new app.models.Books(null, {catId: id});

        // initialize View
        this._cleanupCurrentView();
        app.data.currentView = new app.views.BooksList({
            collection: app.data.books,
        });

        this._activateBooksListPanel();
        $('[data-id="books-list"]').empty().append(app.data.currentView.$el);

        app.data.books.fetch({reset: true});
    },

    // Book Detail
    book: function(id, bookId) {
        console.log("book " + bookId + " for category " + id);

        // models
        app.data.book = new app.models.Book({id: bookId});
        console.log(app.data.book);

        // view
        console.log(app.data.currentView);

        // fetch data
        app.data.book.fetch();
    },

    unknown: function() {
        console.log("Unknown route...");
    },

    _activateBooksListPanel: function () {
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
        $('[data-id="books-list"]').addClass('is-visible');
    },

    _cleanupCurrentView: function() {
        if (app.data.currentView) {
            app.data.currentView.remove();
            app.data.currentView = null;
        }
    }
});
