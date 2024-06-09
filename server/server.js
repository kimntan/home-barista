require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const beansRoutes = require('./src/routes/beans');
const methodsRoutes = require('./src/routes/methods');
const recipesRoutes = require('./src/routes/recipes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.set("trust proxy", 1);

app.use('/api', authRoutes);

const isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: 'Not Authorized'});
  } else {
    next();
  }
}

app.use('/api/beans', isAuth, beansRoutes);
app.use('/api/methods', methodsRoutes);
app.use('/api/recipes', isAuth, recipesRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
})