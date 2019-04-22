const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_SECRET} = require('./configuration');
const User = require('./models/user');
const localStrategy = require('passport-local').Strategy;


// JSON web token strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET }, function(payload, done) {
        User.findById(payload.sub, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));


// local strategy
passport.use(new localStrategy({
    usernameField: 'email'
}, async function(email, password, done){

    try {
        // find user given to email.
        const user = User.findOne({email});
        // if not handle it
        if(!user){
            return done(null, false);
        }
        // check if password is correct
        const isMatch = await user.isValidPassword(password);

        //  if not handle
        if(!isMatch){
            return done(null, false);
        }
        // return user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}))
