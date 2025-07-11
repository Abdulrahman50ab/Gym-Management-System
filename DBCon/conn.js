const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/GymBackend')
    .then(() => console.log('DB connection Successful')).catch(err => {
        console.log(err)
    });