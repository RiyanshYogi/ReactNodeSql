var mysql = require('mysql');
var express = require('express');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database : "reyansh"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = `create table if not exists user(
    id int(10) not null auto_increment,
    name varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    primary key(id)
    )`

  con.query(sql,function(err,result) {
    if(err) console.log(err);
    console.log("table created")
  })
});
