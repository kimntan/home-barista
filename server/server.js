const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})