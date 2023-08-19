import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(201).send('Hello World!!!');
});

app.get('/health', (req, res) => {
    res.send('Working...');
})

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});