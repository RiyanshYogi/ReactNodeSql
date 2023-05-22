const Logger = (req,res,next) => {
    console.log("Request Method");
    next();
}



module.exports = Logger;