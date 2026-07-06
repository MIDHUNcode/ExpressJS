import { users } from "./Constants.mjs";

export const getUserIndexById = (req,res,next)=>{
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).send({ error: "Invalid user ID" });
    }
    const userIndex = users.findIndex(user => user.id === userId) 
    if(userIndex === -1){
        return res.status(404).send({ msg: "User not found" });
    }
    req.userIndex=userIndex;
    next();
}

export const getParamsId = (req,res,next)=>{
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).send({ error: "Invalid user ID" });
    }
    req.id=userId;
    next();
}
