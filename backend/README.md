# Backend Setup

Copy this code to server.js to fix syntax:

```js
require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 500
