const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('*', require('../dist/ssr.js').default);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});