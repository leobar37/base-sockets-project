
import express from 'express';
import { PORT_SERVER } from '../globals/enviroment';
import  morgan from 'morgan'
import  { router}  from '../routes/index';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import  * as socket from '../sockets/socket'
export default class Server {
    private static _instance : Server;
    public app : express.Application;
    public port : number;
    public serveHttp : http.Server;
    public io: SocketIO.Server;
   private constructor (){
        this.app = express();
        this.port = PORT_SERVER;
        this.confiExpres();
        this.serveHttp = new http.Server( this.app);
        this.io = socketIo(this.serveHttp);
        this.escucharSockets();
    }
    /*el patron singlento asegura que 
    solo se tendra una instancia de la clase server :
    Las situaciones más habituales de aplicación de este patrón 
    son aquellas en las que dicha clase controla el acceso 
    a un recurso físico único (como puede ser el ratón o un
     archivo abierto en modo exclusivo) o cuando cierto
    tipo de datos debe estar disponible para todos los
    demás objetos de la aplicación.  */
     public static  get instance(){ return   this._instance || ( this._instance = new Server());}
     private confiExpres(){
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended : false}));
        this.app.use(express.json());
        this.app.use(cors( { origin : true , credentials : true}));
        //rutas
        this.app.use( router);
    }
    private escucharSockets(){
         this.io.on('connection' ,  cliente   =>{            
            //conectar client
            socket.conectarCliente(cliente);
            //flujo de mensajes
            socket.mensaje(cliente ,  this.io); 
           //desconeccion de los sockets
            socket.desconectar(cliente);
            socket.configurarUsuario(cliente , this.io);
            
         })
        
    }
   start(resolve :any){
      this.serveHttp.listen( this.port , resolve );   
   }   

} 


