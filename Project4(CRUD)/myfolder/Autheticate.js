const Authenticate = (req,res,next) => {
    if(req.headers['Token'] == 'ABC') {
        next()
    }
    else {
        // res.status(401).send("You're not authenticated")
        console.log(req.headers['Token'])
    }
}

module.exports = Authenticate;