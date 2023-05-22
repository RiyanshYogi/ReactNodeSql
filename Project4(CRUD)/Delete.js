var pool = require('./Connection');

const Delete = (req,res) => {
    const id = req.params.id;
    const sql = `
    DELETE FROM user WHERE id = ?;
    `
    pool.query(sql,[id],(err,result)=>{
        if(err) res.status(500).send(err);
        res.send("deleted")
    })
}

module.exports = Delete;