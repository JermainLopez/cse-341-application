const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
    //new change
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: '218395047531-p8t2clqkt5v2dllq013526k5mi89ibid.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: '/auth/google/callback'
            },
            async(accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }

                try {
                    let user = await User.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await User.create(newUser)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            console.error(err)
        }
    })
}
