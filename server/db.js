const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/eLearningdb?retryWrites=true&w=majority";

const connectToMongo = ()=> {
    mongoose.connect(MongoUri,  {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
        console.log(`Connected to MongoDB successfully.`);
    }).catch(error=> {
        console.log(`MongoDB connection error: ${error.message}`);
    })
}

module.exports = connectToMongo;