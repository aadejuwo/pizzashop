const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const deliverySchema = new mongoose.Schema({
    zip:  { type: String, required: true},
    flat:  { type: String, required: true},
    street:  { type: String, required: true},
    city:  { type: String, required: true},
    state:  { type: String, required: true},
    store:  { type: String, required: true},
    // organizationAddress:  { 
    //     street: { type: String },
    //     zip: { type: Number },
    //     city: { type: String },
    //     state: { type: String }
    // },
    // projectTitle: {type: String },


});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('delivery', deliverySchema,'deliveries');
//note capital S in the collection name