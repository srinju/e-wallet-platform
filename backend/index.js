const express = require("express");
const cors = require("cors"); //we use cors because here we are using two different URLS both in the frontend and the backend 
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1" , mainRouter );

app.listen(3000);

