var mongoose = require('mongoose')
// Setup schema
var propertySchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})
// Export property model
var Property = (module.exports = mongoose.model('property', propertySchema))
module.exports.get = function (callback, limit) {
  Property.find(callback).limit(limit)
}
