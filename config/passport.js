const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Author = require('../models/Author')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async(accessToken, refreshToken, profile, done) => {
                const newAuthor = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }

                try {
                    let author = await Author.findOne({ googleId: profile.id })

                    if (author) {
                        done(null, author)
                    } else {
                        author = await Author.create(newAuthor)
                        done(null, author)
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
            const user = await Author.findById(id)
            done(null, user)
        } catch (err) {
            console.error(err)
        }
    })
}