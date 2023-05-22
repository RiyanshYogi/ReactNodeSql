var pool = require('./Connection');

const Put = (req,res) => {
    const id = req.params.id;
    const {name,email,password} = req.body;
    const sql = `
    update user set
    name = ?, email = ?, password = ? where id = ?
    `
    pool.query(sql,[name,email,password,id],(err,result)=>{
        if(err) throw err;
        res.send("Ho gya update")
    })
}

module.exports = Put;