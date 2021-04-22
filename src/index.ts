
import express from  'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection} from 'typeorm'
import  userRoutes from "./routes/user.routes";
import  bodyParser from 'body-parser';

createConnection()
.then(async  connection => {
    const app = express();
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Expose-Headers', 'Content-Length');
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
           return next();
        }
    });

    app.set('port', process.env.PORT || 3000);
    

    //Middleware
    app.use(cors());
    app.use(morgan('dev'))
    app.use(bodyParser.json());
    app.use(express.json());

    //Routes 
    app.use(userRoutes);
    app.listen(app.get('port'), function () {
        console.log('app listening at port %s', app.get('port'));
    });
}).catch(error => console.error(error));

