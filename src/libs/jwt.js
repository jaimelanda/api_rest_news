import jwt from "jsonwebtoken"
const  {JWT_SECRET} = process.env

export function sign(id){
    return jwt.sign({id},JWT_SECRET,{expiresIn: 60000});
}

export function verify(token){
    return jwt.verify(token,JWT_SECRET)
}