const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

database = new Datastore('database.db')
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("I got a request");
  
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data);

  response.json({
    status:'success',
    timestamp: data.timestamp,
    latitude: data.latitude,
    longitude: data.longitude
  });
});