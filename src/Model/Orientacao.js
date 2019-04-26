const client = require('./node_modules/mongodb').MongoClient;

module.exports = class Orientacao {
    static find() {
        return client.connect('conexao/banco', {useNewUrlParser: true}).then(
            (client) => {
                let db = client.db('banco');
                return db.collection('professors').find({}).toArray();
            });
    }
};