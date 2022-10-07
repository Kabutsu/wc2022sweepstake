const express = require('express');

const app = express();
const port = 3001;

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World! My name is Sam!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
