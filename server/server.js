require('dotenv').config();
const express = require('express');
const cors = require('cors');
const beansRoutes = require('./src/routes/beans');
const methodsRoutes = require('./src/routes/methods');
const recipesRoutes = require('./src/routes/recipes');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/api/beans', beansRoutes);
app.use('/api/methods', methodsRoutes);
app.use('/api/recipes', recipesRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})