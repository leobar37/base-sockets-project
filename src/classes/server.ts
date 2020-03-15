
import express from 'express';
import { PORT_SERVER } from '../globals/enviroment';
import  morgan from 'morgan'
import  { router}  from '../routes/index';
import cors from 'cors'
export default class Server {
  
    public app : express.Application;
    public port : number;
     
    constructor (){
        this.app = express();
        this.port = PORT_SERVER;
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended : false}));
        this.app.use(express.json());
        this.app.use(cors( { origin : true , credentials : true}));
        //rutas
        this.app.use( router);
    }
    
    
    start(resolve :BlobCallback){
        this.app.listen( this.port,  resolve ); 
    }

} 


