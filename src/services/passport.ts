import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

// Models
import { User } from '../models/User';

// Used to stuff a piece of information into a cookie
passport.serializeUser((user: { _id: string }, done) => {
  console.log('serializing user id: ', user._id);
  done(null, user._id);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => {
    console.log(err);
    done(err, user);
  });
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        const { id, displayName } = profile;

        // Try to find existing user in db
        const foundUser = await User.findOne({ google_id: id }).lean();
        if (foundUser) return done(undefined, foundUser);

        // Else, insert new user
        const newUser = await new User({
          google_id: id,
          display_name: displayName
        }).save();

        done(undefined, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
