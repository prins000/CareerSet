import jwt from "jsonwebtoken";

export const isAuth= async(req,res,next)=>{
     try{
          
        const token = req.cookies.token;

        if(!token){
            res.status(404).json({
                message:"User is not logged in",
                success:false,
            })
        }

         const decoded= await jwt.verify(token,process.env.JWT_SECRET_KEY);
         if(!decoded){
            return res.status(401).json({
                message:"Unauthorized access",
                success:false,
            })
         }

         req.id=decoded.userId;
         next();

     }catch(err){
        console.log(err);
        
     }
}