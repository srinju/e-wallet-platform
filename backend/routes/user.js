const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");


//signup and signin routes >>

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
});

router.post('/signup' , async (req,res) => {

    const obj = signupSchema.safeParse(req.body);
    if(!obj.success) { //not success
        res.json({
            message : "Email already taken / Incorrect inputs"
        });
    }
    //if success then we see that the user already exists or not 
    const user = User.findOne({
        username : req.body.username
    });

    if(user._id) { //if the same userid is present in the database
        return res.json({
            message: "Email already exists / wrong inputs"
        });
    }

    const dbUser = await User.create({ //create user with the body that is what the user has put in the input for body to signup it will get stored to the database
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    }); 

    const userId = dbUser._id;

    ///----create new account----///

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000 //just as a basic project we are putting some fake amount in the account of the user in real life it will be something like when the user makees an account and credits something on that account then only the amount is credited inside the balance tab of the account of that particulat user
    })

    ///---***********-------////

    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.json({
        message : "user created successfully!",
        token : token
    });

});

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
});

router.post('/signin' , async (req,res) => {
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message : "invalid credentials!!"
        });
    }
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);

        return res.json({
            message : "Sign in successful!",
            token : token
        })
    }
    return res.status(401).json({
        message : "Error while logging in!!"
    });
});

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
});

router.put('/updatingInfo' , authMiddleware , async (req,res,next) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message : "Error while updating information!"
        })
    }

    await User.upadateOne(req.body , {
        id : req.userId
    })

    res.json({
        message : "Updated Successfully!"
    });
});

//route to get users from the backend , filterable via firstName/Lastname
//this is needed so users can search for their friends and send them money

router.get('/bulk' , async (req,res) => {
    const filter = req.query.filter || "";
    
    const users = await User.find({
        
        $or : [{ //this syntax is used for the filtering query search technique
            firstName : {
                "$regex": filter
            }
        }, {
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})

module.exports = router;