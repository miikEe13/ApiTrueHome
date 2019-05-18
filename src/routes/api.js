// Initialize express router
const { Router } = require('express')
var propertyController = require('../controllers/Property');

let router = Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Api True Home!',
    })
});
// Property routes
router.route('/propertys')
    .get(propertyController.index)
    .post(propertyController.new);
router.route('/propertys/:property_id')
    .get(propertyController.view)
    .patch(propertyController.update)
    .put(propertyController.update)
    .delete(propertyController.delete);
// Export API routes
module.exports = router;