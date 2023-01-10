import { MongoClient } from 'mongodb';

const filter = {
  'apellido': 'Mei'
};

console.log("Conectando a Mongo!")

const client = await MongoClient.connect(
  'mongodb://127.0.0.1:27017/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
console.log("Conectado con exito!")
const coll = client.db('colegio').collection('estudiantes');

//const cursor = coll.find(filter).limit(2);
// SQL: SELECT TOP 2 FROM collection

const cursor = coll.find(filter).limit(1).skip(3);
const result = await cursor.toArray();
console.log(result);
await client.close();