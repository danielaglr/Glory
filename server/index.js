const express = require('express');
const user = require('./api/user');

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api/user', user);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));