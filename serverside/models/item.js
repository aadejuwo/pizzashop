const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const itemSchema = new mongoose.Schema({
    Pizza: { type: String, required: true },
    Breads: { type: String },
    Drinks: { type: String },
    Desserts: { type: String },
    Crust: { type: String },
    Pepperoni: { type: String },
    ExtraCheese: { type: String },
    Olives: { type: String },
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Item', itemSchema, 'items');
//note small i in the collection name