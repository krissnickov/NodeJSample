// index Data
(function (data) {

    var seedData = require("./seedData");
    //var database = require("./database");

    data.getNoteCategories = function (next) {
        // used for the class saved data
        next(null, seedData.initialNotes);
    };

    // create new category
    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                // find if category exists
                db.notes.find({ name: categoryName }).count(function (err, count) {
                    if (err) {
                        next(err, null);
                    } else {

                        if (count != 0) {
                            next("Category already exists <b>'" + categoryName + "'</b>");
                        } else {
                            // add new Category
                            var cat = {
                                name: categoryName,
                                notes: []
                            };
                            db.notes.insert(cat, function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null);
                                }
                            });
                        }
                    }
                });



            }
        });
    };


})(module.exports);
