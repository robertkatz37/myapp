const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://simtracker.net/search.php', {
      params: req.query
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
