// homeController.js
(function (homeController) {

    var data = require("../data");
    homeController.init = function (app) {
        app.get("/", function (req, res) {
            data.getNoteCategories(function (err, results) {
                res.render("index", {
                    title: "Welcome to NodeJS Sample App.",
                    error: err,
                    categories: results,
                    newCatError: req.flash("newCatName")
                });
            });
        });

        // post the request
        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;

            // insert category
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    // handle error
                    console.log(err);

                    // using connect flash module
                    req.flash("newCatName", err);

                    res.redirect("/");
                } else {
                    // create new category
                    res.redirect("/notes/" + categoryName);
                }

            });

        });
    };

})(module.exports);