var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var pool = require('./Connection');
var {Get,GetId} = require('./Get');
var Post = require('./Post');
var Put = require('./Put');
var Delete = require('./Delete');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : false}))


app.get('/users',Get);
app.get('/users/:id',GetId)

app.post('/users',Post)
app.put('/users/:id',Put)
app.delete('/users/:id',Delete)


app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})
