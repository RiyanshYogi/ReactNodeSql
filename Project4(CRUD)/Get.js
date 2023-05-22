var pool = require('./Connection');
const Get = (req,res) => {
    const sql = "select * from user";
    pool.query(sql,(err,result) => {
        if(err) res.status(500).send(err + "Not found in server");
        else res.send(result);
    })
}

const GetId = (req,res) => {
    const id = req.params.id;
    const sql = `select * from user WHERE id = ?`;
    pool.query(sql,[id],(err,result) => {
        if(err) res.status(500).send(err + "Not found in server");
        else res.send(result); 
    })

}

module.exports = {Get, GetId};