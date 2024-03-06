import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const { PORT, HOST } = process.env;

// console.log(process.env);

const app = express()

app.use(morgan('dev'));


app.get('/search', (req, res, next) => {
    const { food, town } = req.query;
    res.status(200).json({ food, town });
});

app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    res.status(200).json({ userId });
});


'/search?food=burger&town=ashdod'

app.post('/submit', express.json(), (req, res, next) => {
    const { name, email } = req.body;
    res.status(200).json({ name, email });
});

app.use((req, res, next) => {
    res.status(404).send(`404 - ${req.url} was not found`);
});

app.listen(PORT, HOST, () => {
    log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/*
### Challenge instructions

1. Install the `morgan` 3rd party middleware  
use the middleware in your app:  
         `app.use( morgan('dev') );`

2.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

3. return api json response
4. return html markup response
5. return 404 status with a custom response to unsupported routes


*/
