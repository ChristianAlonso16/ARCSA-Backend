const express = require('express');
const cors = require('cors');
const {
   authRouter,taskRouter
} = require('../modules/routes');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(
    cors({
        origins: '*',
    })
);
app.use(
    express.json({
        limit: '50mb',
    })
);

app.get('/', (request, response) => {
    response.send('arcsa dev');
});

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);


module.exports = {
    app
};
