var pool = require('./Connection');

const Post = (req,res) => {
    const {name,email,password} = req.body;
    const sql = `insert into user(name,email,password)
    values(?,?,?)
    `
    pool.query(sql,[name,email,password],(err,result)=>{
        if(err) throw err
        res.send("inserted");
    })
}

module.exports = Post;