/**
 * Your one stop shop for the freshest memes
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 25 - 2020
 */
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true },
    function(err, client) {
        if (err) {
            console.log('Error:')
            console.log(err)
        }
        else {
            let db = client.db('memesrus')
            db.collection('memes').deleteMany({})
                .then(() => {
                    console.log('Deleted stored memes')
                    client.close()
                })
        }
    }
)