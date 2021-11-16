const mongoose = require('mongoose');

//var connPizzashop  = mongoose.createConnection('mongodb://localhost:27017/pizza');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const paymentSchema = new mongoose.Schema({
    CardNumber: { type: String, required: true},
    Month: {type: String, required: true},
    Year: {type: String, required: true},
    Cvv: {type: String, required: true},
    NameOnCard: {type: String, required: true},
    Street: {type: String, required: true},
    Zip: {type: String, required: true},
    City: {type: String, required: true},
    State: {type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Payment', paymentSchema,'payments');
//note capital S in the collection name