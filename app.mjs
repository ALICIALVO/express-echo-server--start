import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';

const app = express()

app.use( morgan('dev'));

// environment variables:
const { PORT, HOST } = process.env;

// console.log(process.env);



// writing middleware function:

const middlewareLogger = (req, res, next) => {
    console.log('LOGGED (1) white');
    next()
}


const middlewareLogger1 = (req,res, next) => {
    log.yellow('LOGGED (2) yellow')
    next()
}

const middlewareLogger2 = (data) => (req ,res, next) => {
    log.info(`${data} RQUESTED URL --> ${req.url}`)
    next()
}
app.use(middlewareLogger)
app.use(middlewareLogger1)
app.use(middlewareLogger2 ("LOL OF COURSE that i'm a req url:"))


// app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.json())

// definition of routing section :


app.get('/',  (req, res) => {
    res.status(200).send(`<h2> Hello Express, Hope you’re doing well! </h2>`)
})


// request query:


// http://localhost:8888/search?phone=iphone&price=3889&color=titanium

app.get('/search', (req, res) => {
    // log.blue("query str phone: " + req.query.phone)
    // log.yellow("query str price: " + req.query.price)
    // log.green("query str color: " + req.query.color)
    // res.status(200).json(req.query)
    console.log(req.query);
    const { phone, price, color } = req.query;
    
    res.send({phone, price, color})
})

// -----------------------------------------------------------------
// app.get('/html', (req, res) => {
    // let insertData = "INSERETED"
    
    // const htmlMarkup = `<h1>I am a headline made with HTML</h1>
    // <p>And I am a simple text paragraph. 
    // The color of this text is styled with CSS. 
    // Click the button below to remove me through the power JavaScript.</p>
    // <button>${insertData}</button>`
    
    // res.status(200).set('Content-Type', 'text/html').send(htmlMarkup)
    // })
    // cmd+shift+R needed to refresh because of chashing
    // ------------------------------------------------------------


    
    // request params:
    
    // '/races/monaco/08.03.2024

    app.use('/races/:raceID/:date', (req, res) => {
        res.status(200).send(`<h1> Next F1 track day in: ${req.params.raceID}</h1> <h2> date: ${req.params.date}</h2>`)
    })


// request body:
    app.post('/races', (req,res,next) => {
        res.status(200).send(`The race will be in ${req.body?.raceName}`)
    })

    // return 404 status:
    app.use( (req,res,next) => {
        res.status(404).send(log.red(`ERROR 404 -  INTERNET (${req.url}) NOT FOUND, check ONLINE for solutions :D `))
    })




app.listen(PORT, HOST,  ()=> {
    log.blue(`🌎  listening on`,`http://${HOST}:${PORT}`);
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