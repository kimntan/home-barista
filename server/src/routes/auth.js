const router = require('express').Router();
const knex = require('knex')(require('../../knexfile.js'));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');

const { userValidator } = require('../utils/validators.js');

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== password) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  }
));

passport.use(new LocalStrategy(async function verify(username, password, done) {
  try {
    const user = await knex('users').where({username: username})
    if (user.length === 0) {
      return done(null, false, {message: 'Incorrect username'})
    } 
    if (user[0].password !== bcrypt.hash(password, 10)) {
      return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, user[0])
  } catch (error) {
    done(error, false, {message: 'Authentication error'})
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
  });

 passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
  });


router.post('/login', (req, res) => {
  passport.authenticate('local', {})
})

router.post('/signup', async (req, res) => {
  const userValidation = userValidator(req);
  if(!userValidation.valid) {
    return res.status(userValidation.status).json({
      message: userValidation.message
    })
  }

  try {
    const hashedPassword = bcrypt.hash(req.body.password, 10);
    const addUser = await knex('users')
      .insert({username: req.body.username, password: hashedPassword})

    const newUser = await knex('users')
      .where({username: req.body.username})
      .first()

    console.log(newUser)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user.`
    })
  }
})

module.exports = router;