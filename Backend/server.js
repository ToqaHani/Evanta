const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db');
app.use(express.json());
const expenseRoutes = require('./routes/expenseRoutes');
const invitationsRoutes = require('./routes/invitationsRoutes');
app.use('/api/budget', expenseRoutes)
app.use('/api/invitations', invitationsRoutes)
let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
})