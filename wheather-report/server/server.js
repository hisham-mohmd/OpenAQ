const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes')(app);

const port = 2000;
app.listen(port, () => console.log("app listening at port " + port + ""));