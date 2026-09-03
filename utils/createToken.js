import jwt from "jsonwebtoken";

export const createToken = (payload) => {
    const token = jwt.sign({userId : payload} ,
     process.env.JWT_SECRET , 
    {expiresIn : process.env.JWT_EXPIRE_TIME})
};