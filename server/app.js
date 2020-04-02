const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema");
const cors = require("cors");

const app = express();
const PORT = 3005;

mongoose.connect("mongodb://max:123456@localhost:27017/covid-19", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on("error", err => console.log(`error ${err}`));
dbConnection.once("open", () => console.log("connected to DB"));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});