const usersController = require("../controllers/usersController");
const passport = require("passport");
module.exports = (app, upload) => {
  app.post("/api/users/create", usersController.register);
  app.post(
    "/api/users/createWithImage",
    upload.array("image", 1),
    usersController.registerWithImage
  );
  app.post("/api/users/login", usersController.login);
  app.put(
    "/api/users/update",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    usersController.update
  );
  app.put(
    "/api/users/updateWithoutImage",
    passport.authenticate("jwt", { session: false }),
    usersController.updateWithoutImage
  );
  app.get(
    "/api/users/findDeliveryUser",
    passport.authenticate("jwt", { session: false }),
    usersController.findDeliveryUser
  );
};
