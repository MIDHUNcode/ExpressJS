import { Router } from "express";
import { getParamsId, getUserIndexById} from "../utils/middleware.mjs";
import { users } from "../utils/Constants.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { User } from "../Mongoose/UsersSchema.mjs";
import { hashPassword } from "../utils/helper.mjs";

const router = Router();

//localhost:3000/users?filter=user_name&value=do
router.get("/api/users", (req, res) => {
    console.log(req.signedCookies);
    if (req.signedCookies.user && req.signedCookies.user === "admin") {
        const {query:{filter,value}}= req;
        if (filter&&value){
            return res.send(users.filter(((user)=>user[filter].toLowerCase().includes(value))));
        }
        res.send(users);
    }
    else {
        return res.status(401).send({ error: "Unauthorized you're not admin" });
    }
});

router.get("/api/users/:id", getParamsId,(req, res) => {
    const id = req.id;
    const user = users.find(user => user.id === id) 
    if(user){
        return res.send(user);
    }
    return res.status(404).send({ error: "User not found" });
}); 

router.post("/api/users", checkSchema(createUserValidationSchema), async (req, res)=> {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = matchedData(req);
    body.password = await hashPassword(body.password);
    const newUser = new User(body);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    }
    catch (error) {
        console.error(error);
        return res.status(400).send({ error: "Error saving user" });
    }
});

router.put("/api/users/:id", getUserIndexById,(req, res)=> {
    const userIndex=req.userIndex;
        const {body} = req;
        users[userIndex] = {id: userId, ...body};
        return res.status(200).send({ message: "User updated" });
})

router.patch("/api/users/:id", getUserIndexById,(req, res)=> {
    const userIndex=req.userIndex;
    const {body} = req;
    users[userIndex] = { ...users[userIndex], ...body };
    return res.sendStatus(200);
})

router.delete("/api/users/:id",getUserIndexById, (req, res)=> {
    const userIndex = req.userIndex;
    console.log(userIndex);
    users.splice(userIndex, 1);
    return res.sendStatus(200);
})


export default router;