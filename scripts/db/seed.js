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
            client.db('memesrus')
                .collection('memes')
                .insertMany([
                    {
                        name: 'Angry Pepe',
                        fileurl: 'https://s3-us-west-2.amazonaws.com/memesrus.storage/angry-pepe.jpg',
                        category: 'pepe',
                        price_id: 'price_1HXw4qDILRu927RJuHo1mYa9'
                    },
                    {
                        name: 'Smart Pepe',
                        fileurl: 'https://s3-us-west-2.amazonaws.com/memesrus.storage/smart-pepe.png',
                        category: 'pepe',
                        price_id: 'price_1HXw5ODILRu927RJymuSPeGI'
                    },
                    {
                        name: 'Green Phil',
                        fileurl: 'https://s3-us-west-2.amazonaws.com/memesrus.storage/green-phil.jpg',
                        category: 'phil',
                        price_id: 'price_1HXw5lDILRu927RJBThGi9HL'
                    },
                    {
                        name: 'Magic Phil',
                        fileurl: 'https://s3-us-west-2.amazonaws.com/memesrus.storage/magic-phil.jpg',
                        category: 'phil',
                        price_id: 'price_1HXw61DILRu927RJAFBlIOk1'
                    },
                    {
                        name: 'Real Phil',
                        fileurl: 'https://s3-us-west-2.amazonaws.com/memesrus.storage/real-phil.jpg',
                        category: 'phil',
                        price_id: 'price_1HXw6IDILRu927RJhIo99uWv'
                    }
                ])
                .then(results => {
                    console.log('Results:')
                    console.log(results)
                    client.close()
                })
                .catch(error => {
                    console.error('Error:')
                    console.error(error)
                })
        }
    }
)