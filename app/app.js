const express = require('express');
const chemicalRoutes = require('./routes/chemicalRoutes');

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/chemical-type', chemicalRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
