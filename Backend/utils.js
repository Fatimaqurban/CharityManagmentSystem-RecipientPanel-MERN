const jwt = require("jsonwebtoken")

let AuthenticateUser = async(req , res , next) =>{

    let token = req.headers.token;

    try{
    let DecodedData = await jwt.verify(token , process.env.SECRET_KEY);
    
    if(DecodedData)
    {
        req.userId = DecodedData.id;
        req.role= DecodedData.role;
        req.name= DecodedData.name;
        if(DecodedData.profilePicture){
          req.profilePicture=DecodedData.profilePicture;
        }

        next()
    }else
    {
        res.status(404).json({"Message":"You are Not Authenticated"})
    }
}catch(err)
{
    res.status(404).json({"Message":"You are Not Authenticated" , err})

}};


module.exports ={
    AuthenticateUser
}