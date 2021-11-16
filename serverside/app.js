const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//connect and display the status 
mongoose.connect('mongodb://localhost:27017/pizzashop', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify where to find the schema
const delivery = require('./models/delivery');
const Payment = require('./models/payment');
const Item = require('./models/item');
const order = require('./models/order')
//const Item = require('./models/item');
const { isTemplateExpression } = require('typescript');
const contextRoot = 'pizza';

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});


//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//parse application/json
app.use(express.json())

/*#############################*/
//PAYMENT - APIS - ADETAYO
/*#############################*/

//find a project based on the id
app.get('/pizzashops/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Payments.findOne())
    Payment.findOne({_id: req.params.id})
    //Item.findOne({})
    //Toppings.findOne({}).then(data=>)


        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

//in the app.get() method below we add a path for the prjects API 
//by adding /payments, we tell the server that this method will be called every time http://localhost:8000/payments is requested. 
app.get('/pizzashops', (req, res, next) => {
    //call mongoose method find (MongoDB db.projects.find())
    Payment.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
    });
});


//serve incoming post requests to /payments
app.post('/pizzashops', (req, res, next) => {   
    // create a new payment variable and save request’s fields 
    const payment = new Payment({
        CardNumber: req.body.CardNumber,
        Month: req.body.Month,
        Year: req.body.Year ,
        Cvv: req.body.Cvv,
        NameOnCard: req.body.NameOnCard ,
        Street: req.body.Street,
        Zip: req.body.Zip,
        City: req.body.City,
        State: req.body.State,
    });

//send the document to the database 
    payment.save()
//in case of success
    .then(() => { console.log('Success');})
//if error
    .catch(err => {console.log('Error:' + err);});
});
    
//serve incoming put requests to /payments 
app.put('/pizzashops/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Payment.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
            CardNumber: req.body.CardNumber,
            Month: req.body.Month,
            Year: req.body.Year ,
            Cvv: req.body.Cvv,
            NameOnCard: req.body.NameOnCard,
            Street: req.body.Street,
            Zip: req.body.Zip,
            City: req.body.City,
            State: req.body.State,
            }}, 
            {new:true} 
        ) 
        .then((payment) => { 
            if (payment) { //what was updated 
                console.log(payment); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/pizzashops/:id", (req, res, next) => {
    Payment.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
      });
});


/*#############################*/
//DELIVERY - APIS - PAT
/*#############################*/

//To get all delivery details
app.get('/deliveryDetails', (req, res, next) => {
    delivery.find()
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});
debugger;
//serve incoming post requests to /project
app.post('/addDeliveryDetails', (req, res, next) => {
    const deliveryReq = new delivery({
        zip: req.body.zip,
        flat: req.body.flat,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        store: req.body.store,
    })
    deliveryReq.save()
    .then(() => {console.log('Success');})
    .catch(err => {console.log('Error' + err);});
});

//To delete delivery details
app.delete("/deleteDeliveryDetails/:id", (req, res, next) => {
    delivery.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//To Update Delivery details
app.put('/updateDeliveryDetails/:id', (req, res, next) => { 
    console.log("id: " + req.params.id)
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        delivery.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                zip: req.body.zip,
                flat: req.body.flat,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                store: req.body.store,
            }}, 
            {new:true} 
        ) 
        .then((project) => { 
            if (project) { 
                console.log(project); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//To fetch single delivery detail
app.get('/deliveryDetails/:id', (req, res, next) => {
    delivery.findOne({_id: req.params.id})
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});    
/*#############################*/
//MENU - APIS - SRAVS
/*#############################*/
//find a item based on the id
app.get('/items/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Projects.findOne())
    Item.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});
//in the app.get() method below we add a path for the items API 
//by adding /items, we tell the server that this method will be called every time http://localhost:8000/items is requested. 
app.get('/items', (req, res, next) => {
    //we will add an array named items to pretend that we received this data from the database
    //call mongoose method find (MongoDB db.items.find())
    Item.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });


});
//serve incoming post requests to /items
app.post('/items', (req, res, next) => {
    const item = new Item({
        Pizza: req.body.Pizza,
        Breads: req.body.Breads,
        Drinks: req.body.Drinks,
        Desserts: req.body.Desserts,
        Crust: req.body.Crust,
        Pepperoni: req.body.Pepperoni,
        ExtraCheese: req.body.ExtraCheese,
        Olives: req.body.Olives

    });

    //send the document to the database 
    item.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });

});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/items/:id", (req, res, next) => {
    Item.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/items/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        //find a document and set new first and last names 
        Item.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    Pizza: req.body.Pizza,
                    Breads: req.body.Breads,
                    Drinks: req.body.Drinks,
                    Desserts: req.body.Desserts,
                    Crust: req.body.Crust,
                    Pepperoni: req.body.Pepperoni,
                    ExtraCheese: req.body.ExtraCheese,
                    Olives: req.body.Olives
                }
            },
            { new: true }
        )
            .then((item) => {
                if (item) { //what was updated 
                    console.log(item);
                } else {
                    console.log("no data exist for this id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }

});
/*#############################*/
//OM - APIS - SHALAKA
/*#############################*/
//find a item based on the id
app.get('/orders/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Projects.findOne())
    order.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});
//in the app.get() method below we add a path for the items API 
//by adding /items, we tell the server that this method will be called every time http://localhost:8000/items is requested. 
app.get('/orders', (req, res, next) => {
    //we will add an array named items to pretend that we received this data from the database
    //call mongoose method find (MongoDB db.items.find())
    order.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });


});
//serve incoming post requests to /items
app.post('/orders', (req, res, next) => {
    const orderVal = new order({
        items: req.body.items
        // Pizza: req.body.Pizza,
        // Breads: req.body.Breads,
        // Drinks: req.body.Drinks,
        // Desserts: req.body.Desserts,
        // Crust: req.body.Crust,
        // Pepperoni: req.body.Pepperoni,
        // ExtraCheese: req.body.ExtraCheese,
        // Olives: req.body.Olives

    });

    //send the document to the database 
    orderVal.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });

});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/orders/:id", (req, res, next) => {
    order.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/orders/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        //find a document and set new first and last names 
        order.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    items: req.body.item
                    // Pizza: req.body.Pizza,
                    // Breads: req.body.Breads,
                    // Drinks: req.body.Drinks,
                    // Desserts: req.body.Desserts,
                    // Crust: req.body.Crust,
                    // Pepperoni: req.body.Pepperoni,
                    // ExtraCheese: req.body.ExtraCheese,
                    // Olives: req.body.Olives
                }
            },
            { new: true }
        )
            .then((order1) => {
                if (order1) { //what was updated 
                    console.log(order1);
                } else {
                    console.log("no data exist for this id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }

});

//to use this middleware in other parts of the application
module.exports=app; 