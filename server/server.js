require('dotenv').config();
const express = require('express');
const cors = require('cors');
const beansRoutes = require('./src/routes/beans');
const methodsRoutes = require('./src/routes/methods');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/api/beans', beansRoutes);
app.use('/api/methods', methodsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})