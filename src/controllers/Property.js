// propertyController.js
Property = require('../models/Property');
// Handle index actions
exports.index = function (req, res) {
    Property.get(function (err, propertys) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Property retrieved successfully",
            data: propertys,
            total: propertys.length
        });
    });
};
// Handle create property actions
exports.new = function (req, res) {
    var property = new Property();
    property.name = req.body.name;
    property.lastname = req.body.lastname;
    property.email = req.body.email;
    property.phone = req.body.phone;
    property.address = req.body.address;
    property.price = req.body.price;

    // save the property and check for errors
    property.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New property created!',
            data: property
        });
    });
};
// Handle view property info
exports.view = function (req, res) {
    Property.findById(req.params.property_id, function (err, property) {
        if (err)
            res.send(err);
        res.json({
            message: 'Property details loading..',
            data: property
        });
    });
};
// Handle update property info
exports.update = function (req, res) {
    Property.findById(req.params.property_id, function (err, property) {
        if (err)
            res.send(err);
        property.name = req.body.name;
        property.lastname = req.body.lastname;
        property.email = req.body.email;
        property.phone = req.body.phone;
        property.address = req.body.address;
        property.price = req.body.price;
        // save the property and check for errors
        property.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Property Info updated',
                data: property
            });
        });
    });
};
// Handle delete property
exports.delete = function (req, res) {
    Property.remove({
        _id: req.params.property_id
    }, function (err, property) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Property deleted'
        });
    });
};