const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  const token = req.headers['x-relay-token'];
  if (token !== 'Xy93w8R2kfL0sA!g') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch('https://relay.coinfocus.de/relay.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Relay-Token': 'Xy93w8R2kfL0sA!g'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Upstream relay failed', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Relay is online');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Relay running on port ${port}`);
});
