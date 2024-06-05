const router = require('express').Router();
const knex = require('knex')(require('../../knexfile.js'));
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
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
    return done(null, user[0])
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


router.post('/login', passport.authenticate('local', {
  failureRedirect: "http://localhost:3000/login",
  successRedirect: "http://localhost:3000/"
}))

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
    console.log(hashedPassword);
    const addUser = await knex('users')
      .insert({
        'username': req.body.username, 
        'password': hashedPassword
      })

    const newUser = await knex('users')
      .where({username: req.body.username})
      .first()

    console.log(newUser)
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to create new user.`
    })
  }
})

module.exports = router;