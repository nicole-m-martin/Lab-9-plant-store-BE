const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/plants', require('./controllers/plants'));
app.use('/api/v1/pots', require('./controllers/pots'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
