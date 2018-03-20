//Model
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the user requests
  app.get("/api/requestnewspot", function(req, res) {
    var query = {};
    if (req.query.location_id) {
      query.LocationId = req.query.Location_id;
    }
    db.Location.findAll({
      where: query,
    }).then(function(dblocation) {
      res.json(dblocation);
    });
  });

  // POST route for saving a new location to the database
  app.post("/api/requestnewspot", function(req, res) {
    console.log(req.body);
    db.Location.create(req.body).then(function(dblocation) {
      res.json(dblocation);
    });
  });

  // PUT route for updating request
  app.put("/api/requestnewspot", function(req, res) {
    console.log(req.body);
    db.Location.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLocations) {
      res.json(dbLocations);
    });
  });

  //DELTE route for deleting locations
  app.delete("/api/requestnewspot/:id", function(req, res) {
    db.Location.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });
}



