const express = require('express');
const chemicalRoutes = require('./routes/chemicalRoutes');
const mechanicalRoutes = require('./routes/mechanicalRoutes');

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/chemical-type', chemicalRoutes);
app.use('/mechanical-type', mechanicalRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
