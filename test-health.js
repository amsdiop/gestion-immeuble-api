const http = require('http');

const req = http.get('http://localhost:3000/health', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log('Response:', data); });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

req.setTimeout(3000, () => {
  console.error('Request timeout');
  req.destroy();
});
