import Server from './classes/server';



const server = new Server();


server.start( ()=>{
  
 console.log('listen on port: ' + server.port);
 
});