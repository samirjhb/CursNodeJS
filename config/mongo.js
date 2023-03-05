const mongoose = require("mongoose");

const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_URI) 
        console.log('Mongo connected 🚀🚀')
    } catch(error) {
        console.log(error)
        process.exit()
    }
    // mongoose.connect(DB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }, (err, res )=>{
    //     if (!err) {
    //         console.log("Conection DB");
    //     }else{
    //         console.log("Error Conection DB");
    //     }
    // })
};

module.exports = dbConnect;

