const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

// import routes
const authRoutes = require('./routes/authRoutes');
// import routes
const userRoutes = require('./routes/userRoutes');
// import routes
const jobTypeRoute = require('./routes/jobsTypeRoutes');

//database connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '5mb',
        extended: true,
    })
);
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send('Hello from Node Js');
// });
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);

// error middleware
app.use(errorHandler);

// port
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
