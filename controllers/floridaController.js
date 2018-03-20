var db = require("../models");

module.exports = {
  renderHome: function(req, res) {
    db.Location.findAll({
      where: {
        approved: 1
      }
    }).then(function(location_data) {
      var hbsObject = { locations: location_data, user: req.user };
      res.render("index", hbsObject);
    });
  },
  renderAdminPage: function(req, res) {
    db.Location.findAll({
      where: {
        approved: 0
      }
    }).then(function(location_data) {
      var hbsObject = { locations: location_data, user: req.user };
      res.render("adminPage", hbsObject);
    });
  },
  renderRequestNewSpot: function(req, res) {
    res.render("requestNewSpot")
  },
  login: function(req, res) {
    res.render("login");
  },
  editSpot: function(req, res) {
    res.render("editPage");
  },
  createUserForm: function(req, res) {
    res.render("createUserForm");
  },
  approveDesitnation: function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("put condition: ", condition);

    db.Location.update({
        approved: true
    }, condition, function(result) {
      console.log("results from controller.js: " + result);
        if (result.changedRows == 0) {
          console.log("hello");
            return res.status(404).end();
        } else {
            res.redirect("/adminPage");
        }
    });

  },


  
  editModal: function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("put condition: ", condition);

    db.Location.update({
        // Need to put the changed information in here
    }, condition, function(result) {
      console.log("results from controller.js: " + result);
        if (result.changedRows == 0) {
          console.log("edited the modal");
            return res.status(404).end();
        } else {
            res.redirect("/adminPage");
        }
    });

  }
};
  