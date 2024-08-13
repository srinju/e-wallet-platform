const express = require("express");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
const { abort } = require("process");

const router = express.Router();

//getting the balance the user has >> 

router.get('/balance' , authMiddleware , async (req,res) => {
    const account = await Account.findOne({ // finding the account with the userid the user has signed into
        userId : req.userId
    });
    res.json({
        balance : account.balance
    });
});

//transfering money from one account to another account >>>  (****)

//problems that could be faced in this /transfer end point >>
/*
1> like when there is two concurrent request then the transaction will fail coz two concurrent request can fool the if check and pass it through -- fix we used for this is creating a different session for transfering the data
2> there could be a partial transaction that is suppose user1 is sending $10 to user2 and after transaction the server or the backend faces an issue due to any cause then the partial transaction would happen that the money could be credited to the user2 but not debited from the user1 ---fix for that we used is the abort transaction whenver something like this occurs
*/

router.post('/transfer' , authMiddleware , async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    //fetch the account within the transaction>>
    const account = await Account.findOne({userId : req.userId}).session(session);

    if(!account || account.balance < amount){ //double if check that the sender account is present and also that the balance is more than the sending amount if not then abort session
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance !!"
        });
    }

    const toAccount = await Account.findOne({userId : req.userId}).session(session);

    if(!toAccount) { //checking that the to account that is the receiver account is valid or not if not then abort the session
        await session.abortTransaction();
        res.status(400).json({
            message : "Invalid account"
        })
    }

    //perform the transfer >>
    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to},{$inc : {balance : amount}}).session(session);

    //commit the transaction >>
    await session.commitTransaction();
    res.json({
        message : "Transaction Successful!!"
    });
});

module.exports = router;