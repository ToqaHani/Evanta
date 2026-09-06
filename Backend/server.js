const express = require('express');
const mongoose = require('mongoose');
const app = express();
// -------------connection------------- //
app.use(express.json());
let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
})