const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');

const router = require('./routes/server');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/esmsrouting', router);

mongoose.connect("mongodb+srv://username:password@angular-mongodb1.c5bcw.mongodb.net/ESMSDB",
    (err) => {
        if (err) {
            console.log("DB not Connected");
        } else {
            console.log("DB Connected");
        }

    }
)



app.get('/', (req, res) => {
    res.send("Hello world from Nanneboina Sumanth");

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});