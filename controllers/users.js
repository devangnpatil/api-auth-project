const  JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration/index')
signToken = (user) =>{
    return JWT.sign({
        iss:'CodeWorker',
        sub: user.id,
        iat: new Date().getTime(),
        expiresIn: new Date().setDate(new Date() +1) //current time + 1,
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password} = req.value.body;
        //  check if user exist

        const foundUser = await User.findOne({email});

        if(foundUser){
            res.status(403).json({
                error: 'Email already used'
            });
        }

        // create new user 
        const newUser = new User({ email, password });
        await newUser.save();

        
        // res.json({user: 'Created'});

        // generate token
        const token = signToken(newUser)

        // respond with token
        res.status(200).json({token});
    },
    signIn: async (req, res, next) => {
       console.log('Sign in Success');
    },
    secret: async (req, res, next) => {
        res.json('Secret research');
    }
} 
