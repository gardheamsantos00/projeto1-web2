const client = require('mongodb').MongoClient;

module.exports = class Professor {
    static find() {
        return client.connect('conexao/banco', {useNewUrlParser: true}).then(
            (client) => {
                let db = client.db('banco');
                return db.collection('professors').find({}).toArray();
            });
    }
};