const express  = require('express'),
      app = express(),
      morgan = require('morgan'),
      dotenv = require('dotenv'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      cookieParser = require('cookie-parser'),
      fs = require('fs'),
      cors = require('cors')
dotenv.config();
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
    console.log('database connected');
}).catch(err => {
    console.log(err.message)
})


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})


