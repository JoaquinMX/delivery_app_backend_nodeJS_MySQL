const ordersController = require("../controllers/ordersController");
const passport = require("passport");
module.exports = (app) => {
  app.get(
    "/api/orders/findByStatus/:status",
    passport.authenticate("jwt", { session: false }),
    ordersController.findByStatus
  );
  app.post(
    "/api/orders/create",
    passport.authenticate("jwt", { session: false }),
    ordersController.create
  );
};
