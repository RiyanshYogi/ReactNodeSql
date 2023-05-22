var connection = require('./connection');
const LoggerDB = (req,res,next) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.socket.remoteAddress);
    const {url,method,remoteAddress} = req.body;


    const sql = `
    insert into authuser(url,method,remoteAddress)
    values(?,?,?);
    `
    connection.query(sql,[url,method,remoteAddress],(err,result) => {
    })

    next();
}

module.exports = LoggerDB;