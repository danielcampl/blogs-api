const express = require('express');
const { LoginRoutes, UserRoutes, CategoryRoutes, PostRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use('/login', LoginRoutes);
app.use('/user', UserRoutes);
app.use('/categories', CategoryRoutes);
app.use('/post', PostRoutes);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
