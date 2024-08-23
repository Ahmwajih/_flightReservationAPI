const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const dbConnection = require('./configs/dbConnection');
dbConnection();

app.use(express.json());

app.use('express-async-errors');
app.use(require('cors')());
app.use(require('./middlewares/errorHandler'));


const MainRouter = require('./routes/index');
app.use('/', MainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

