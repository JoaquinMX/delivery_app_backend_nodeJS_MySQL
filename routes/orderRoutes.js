const ordersController = require('../controllers/ordersController');
const passport = require('passport');
module.exports = (app) => {

    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), ordersController.create);

}