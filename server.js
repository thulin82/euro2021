const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const apicache = require('apicache');

dotenv.config({ path: './config/config.env' });

const app = express();
const cache = apicache.middleware;

//Middleware
app.use(cors());
app.use(cache('5 minutes'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
