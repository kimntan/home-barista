require('dotenv').config();
const router = require('express').Router();
const knex = require('knex')(require('../../knexfile.js'));
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

router.use(session({
  name: 'home-barista',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,
    secure: true, 
  }  
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, done) {
  try {
    const user = await knex('users').where({'username': username})
    if (user.length === 0) {
      return done(null, false, {message: 'Incorrect username'})
    } 
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return done(null, false, {message: 'Incorrect password'})
    }
    done(null, user[0])
  } catch (error) {
    done(error, false, {message: 'Authentication error'})
  }
}));

passport.serializeUser((userObj, done) => {
  done(null, userObj.id);
});

passport.deserializeUser(async (userObjId, done) => {
  const user = await knex('users').where({'id': userObjId}).first();
  done(null, user);
});

router.post('/login', passport.authenticate('local', {failureMessage: true}), (req, res) => {
  if (req.user) {
    res.status(200).json({
      username: req.user.username,
      message: 'Successful login!'
    })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const existed = await knex('users')
      .where({username: req.body.username})

    if (existed.length !== 0) {
      return res.status(400).json({
        message: 'Username already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await knex('users')
      .insert({
        'username': req.body.username, 
        'password': hashedPassword
      })

    const newUser = await knex('users')
      .where({username: req.body.username})
      .first()

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user.`
    })
  }
})

router.get('/user', (req, res) => {
  res.status(200).json({
    username: req.user.username,
    id: req.user.id
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  req.logout(function(err) {
    req.session.destroy(function(err) {
      res.send();
    })
  });
})

module.exports = router;