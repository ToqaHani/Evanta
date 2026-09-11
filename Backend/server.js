const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const app = express();
app.use(cors());
app.use(express.json());
const expenseRoutes = require('./routes/expenseRoutes');
const invitationsRoutes = require('./routes/invitationsRoutes');
app.use('/api/budget', expenseRoutes)
app.use('/api/invitations', invitationsRoutes)
let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
})