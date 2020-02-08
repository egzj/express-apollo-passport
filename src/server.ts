import express from 'express';
import passport from 'passport';
import moment from 'moment';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';

import { connectDB } from './connectDB';

import { schema } from './schema';

// Get process env variables
require('dotenv').config();

// Connect to database
connectDB(process.env.MONGO_URI || '');

require('./services/passport');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3004'],
    credentials: true
  })
);

app.use(
  session({
    secret: 'POTATO',
    cookie: {
      expires: moment()
        .add(1, 'hours')
        .toDate()
    },
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
  })
);
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // console.log('Succssfully logined!');
    // console.log('req.user: ', req.user);
    res.redirect(process.env.CLIENT_URL || '');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // console.log('context req.user:', req.user);
    return {
      user: req.user,
      logout: () => req.logout()
    };
  },
  playground:
    process.env.NODE_ENV === 'production'
      ? false
      : {
          settings: {
            'request.credentials': 'include'
          }
        }
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
