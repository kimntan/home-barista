const router = require('express').Router();
const knex = require('knex')(require('../../knexfile.js'));
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
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

 passport.deserializeUser(async (id, done) => {
  const user = await knex('users').where({'username': username}).first();
  done(null, user);
  });


router.post('/login', async (req, res) => {
  // passport.authenticate('local', {})
  const { username, password } = req.body;

  try {
    const user = await knex('users').where({'username': username});
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password '})
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password)
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password '})
    }

    const token = jwt.sign(
      { username: user[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "24h"}
    )

    res.send({token});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Authentication error' })
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