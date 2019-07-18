const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('./public'))

app.use(morgan('combined'));

app.post('/user_create', (req, res) => {
    console.log("Trying to post");

    console.log("First Name: " + req.body.create_firstName)
    const firstName = req.body.create_firstName;
    const lastName = req.body.create_lastName;

    const queryString = "INSERT INTO users (firstName, lastName) VALUES (?, ?)";
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }

        console.log("Inserted a new user with id: ", results.insertID);
        res.end()
    })
})

function getConnection() {
    return mysql.createConnection({
        host: 'umucmysql2.c2hxnud5u3yd.us-east-1.rds.amazonaws.com',
        user: 'umucmaster',
        password: 'umucCMSC495!!',
        database: 'ffdb'
    });
}

app.get('/user/:ID', (req, res) => {
    console.log("User ID: " + req.params.ID);

    const connection = getConnection();

    const userID = req.params.ID;
    const queryString = "SELECT * FROM users WHERE ID = ?";

    connection.query(queryString, [userID], (err, rows, fields) => {

        if (err) {
            console.loglog("Error: " + err);
            res.sendStatus(500);
            return;
        }

        console.log("MySQL Query");
        const users = rows.map((row) => {
            return { firstName: row.firstName, lastName: row.lastName }
        });

        res.json(users);
    });
});

app.get("/", (req, res) => {
    console.log("respond/root route");
    res.send("Hello from root");
});

//app.get("/users", (req, res) => {
// var user1 = {
// firstName: "Max",
//  lastName: "Wimmer",
//  preferences: "vegan",
//  location: "78750",
//username: "eater1",
//password: "example",
//  user_ID: "00000"
//};

//  res.json([user1]);
//});

const connection = getConnection();
const queryString = "SELECT * FROM users";
connection.query(queryString, (err, rows, fields) => {

    if (err) {
        console.log("Error: " + err);
        res.sendStatus(500);
        return;
    }

    res.json(rows)
});


app.listen(3001, () => {
    console.log("Server listening on 3001");
});