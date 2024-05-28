const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3500;

// Enable CORS
app.use(cors());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, './build')));

// Connect to MongoDB
const mongoUrl = 'mongodb+srv://kannaiahgarimanish:bcCyuJiTkWd1pIb2@cluster0.x7ilbdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'userdb';

MongoClient.connect(mongoUrl)
  .then((client) => {
    const db = client.db(dbName);
    const userCollectionObj = db.collection('usercollection');
    const productCollectionObj = db.collection('productcollection');

    // Set MongoDB collections as app properties
    app.set('userCollectionObj', userCollectionObj);
    app.set('productCollectionObj', productCollectionObj);

    console.log('DB connection success');
  })
  .catch((err) => console.log('Database connect error:', err));

// API routes for user and product
const userApi = require("./API's/userApi");
const productApi = require("./API's/productApi");
app.use('/user-api', userApi);
app.use('/product-api', productApi);

// Route to handle page refresh
const pageRefresh = (request, response, next) => {
  response.sendFile(path.join(__dirname, './build/index.html'));
};
app.use('*', pageRefresh);

// Middleware for invalid paths
const invalidPathMiddleware = (request, response, next) => {
  response.send({ message: 'Invalid Path' });
};
app.use('*', invalidPathMiddleware);

// Error handling middleware
const errhandlingMiddleware = (error, request, response, next) => {
  response.send({ message: error.message });
};
app.use(errhandlingMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
