const express = require('express');
const path = require('path');

const table = require('./db/db.json')
// initializing express app
const app = express();

// establishing port through heroku default or local 3001
const PORT = process.env.PORT || 3001;

// middleware for handling user input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default for where we serve our static assets
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // res.json(table);
  // res.json(`${req.method} request received`);
  // console.info(req.rawHeaders);
  console.info(`${req.method} request received`);

  return res.json(table);
});

app.get('/api/notes/:title', (req, res) => {
  // Coerce the specific search term to lowercase
  const requestedTitle = req.params.title.toLowerCase();

  // Iterate through the terms name to check if it matches `req.params.term`
  for (let i = 0; i < table.length; i++) {
    if (requestedTitle === table[i].title.toLowerCase()) {
      return res.json(table[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json('No match found');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
  // res.json(table);
  // res.json(`${req.method} request received`);
  // console.info(req.rawHeaders);
  console.info(`${req.method} request received`);

  let response;

  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body
    };
    res.json(`Review for ${response.data.title} has been added!`)
  } else {
    res.json('Request body must at least contain a product name');
  }

  console.log(req.body);
});

app.delete('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
})

// active port
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));


