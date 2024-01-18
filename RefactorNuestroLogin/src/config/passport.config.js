import passport from "passport";
import local from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2'
import userModel from "../dao/models/user.model.js";
import { crateHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField:'email'
    }, async(req, username, password, done) => {
        const{firstName, lastName, email, age } = req.body
        try{
            const user = await userModel.findOne({ email: username})
            if (user) {
                return done(null, false)
            }
            const newUser = {
                firstName, lastName, email, age, password:crateHash(password)
            }

            const result = await userModel.create(newUser)
            return done(null, result)

        } catch(err) {
            return done(err)
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email',
    }, async(username, password, done) => {
        try{
            const user = await userModel.findOne({ email: username})
            if (!user) return done(null, false)
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        }catch(err){
            return done(err)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.20f56b14ccdd839d',
        clientSecret: 'c81fc9f0e54f6ff79c7eb35c2bc6d6657e3e32bf',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const user = await userModel.findOne({ email: profile._json.email });
            if (user) {
                return done(null, user);
            }
    
            const newUser = new userModel({
                firstName: profile._json.name,
                lastName: '',
                email: profile._json.email,
                age: '',
                password: ''
            });
    
            await newUser.save(); // Wait for the user to be saved
            return done(null, newUser);
        } catch (err) {
            return done('Error to login with GitHub');
        }
    }));
    

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport