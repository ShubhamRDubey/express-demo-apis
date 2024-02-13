const express = require('express');
const chemicalRoutes = require('./routes/chemicalRoutes');
const mechanicalRoutes = require('./routes/mechanicalRoutes');
const threadSizeRoutes = require('./routes/threadSizeRoutes');
const dinRoutes = require('./routes/dinRoutes');
const itemRoutes = require('./routes/itemRoutes');
const attributeRoutes = require('./routes/attributeRoutes');
const itemAttributeRoutes = require('./routes/itemAttributeRoutes');

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/chemical-type', chemicalRoutes);
app.use('/din-type', dinRoutes);
app.use('/mechanical-type', mechanicalRoutes);
app.use('/thread-size-type', threadSizeRoutes);
app.use('/item-type', itemRoutes);
app.use('/attribute-type', attributeRoutes);
app.use('/item-attributes', itemAttributeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
