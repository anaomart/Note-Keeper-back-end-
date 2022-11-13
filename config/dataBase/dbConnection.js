const mongoose = require('mongoose');
const url = 'mongodb://omar:omarmero@ac-ii9c06i-shard-00-00.uzjij9v.mongodb.net:27017,ac-ii9c06i-shard-00-01.uzjij9v.mongodb.net:27017,ac-ii9c06i-shard-00-02.uzjij9v.mongodb.net:27017/?ssl=true&replicaSet=atlas-ypb014-shard-0&authSource=admin&retryWrites=true&w=majority'

//"mongodb://localhost:27017/notepad"
function dbConnection() {
    mongoose.connect(
        url, {
            useNewUrlParser: true
        }
    ).then(() => console.log("Connecting to MongoDB...")).catch(err => console.log(err))
}

module.exports = dbConnection;