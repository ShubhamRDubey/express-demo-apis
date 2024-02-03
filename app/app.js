const express = require('express');
const chemicalRoutes = require('./routes/chemicalRoutes');
const mechanicalRoutes = require('./routes/mechanicalRoutes');
const threadSizeRoutes = require('./routes/threadSizeRoutes');

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/chemical-type', chemicalRoutes);
app.use('/mechanical-type', mechanicalRoutes);
app.use('/thread-size-type', threadSizeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
