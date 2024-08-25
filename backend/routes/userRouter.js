const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config")
const router  = express.Router();
const {User} = require("../db")


// Schema to validate Inputs using ZOD
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    fistName: zod.string(),
    lastName: zod.string()
});

router.post("/signup" , async (req,res) =>{
    const body = req.body;

    // Parsing the input body
    const {success} = signupSchema.safeParse(req.body)
    if(!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // Checking if the user already exist in the user table
    const user = User.findOne({
        username: body.username
    })
    if (user._id){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body)
    const token = jwt.sign({
        userId:dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

});

const signinBody = zod.object({
    username: zod.email(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const success = signinBody.safeParse(req.body)

    if(!success){
        return res.body({
            message: "Incorrect Username or Password"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });

    if (user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })


})
module.exports = router