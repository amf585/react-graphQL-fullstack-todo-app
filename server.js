const cors = require('cors');
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const mysql = require('mysql');

// Express app
const app = express();
app.use(cors());

// GraphQL Schema
const schema = buildSchema(`
    type Task {
        id: String,
        name: String,
        completed: Boolean
    }
    type Query {
        getTasks: [Task]
    }
    type Mutation {
        addTask(name: String): Boolean,
        completeTask(completed: Boolean, id: Int): Boolean,
        removeTask(id: Int): Boolean
    }
`);

// Query method
const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err) { 
            return reject(err); 
        }
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

// GraphQL root endpoint
const root = {
    getTasks: (args, req) => queryDB(req, "select * from tasks").then(data => data),
    addTask: (args, req) => queryDB(req, "insert into tasks SET ?", args).then(data => data),
    removeTask: (args, req) => queryDB(req, "delete from tasks where id = ?", [args.id]).then(data => data),
    completeTask: (args, req) => queryDB(req, "update tasks SET completed = ? where id = ?", [args.completed, args.id]).then(data => data)
};

// MySQL Db connection
app.use((req, res, next) => {
    req.mysqlDb = mysql.createConnection({
        host     : 'localhost',
        user     : '[YOUR_USERNAME]',
        password : '[YOUR_PASSWORD]',
        database : 'todo_app'
    });
    req.mysqlDb.connect();
    next();
});

// GraphQL endpoint
app.use('/gqltasks', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
  
// Server port
app.listen(4000);

// Startup message
console.log('Running a GraphQL API server at localhost:4000/gqltasks');