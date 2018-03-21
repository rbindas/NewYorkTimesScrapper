const router = require("express").Router();
const nytController = require("../controllers/nytController");

// Matches with "/api/articls"
router.route("/")
  .get(nytController.findAll)
  .post(nytController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .delete(nytController.remove);

module.exports = router;
