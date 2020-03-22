import { Socket  , Server} from "socket.io";
import { UsuarioList } from '../classes/usuarioLista';
import { Usuario } from '../classes/usuario';
import { IUsuarioFro } from '../models/interfaces';

export const listaUsuario =  new UsuarioList();

export const   conectarCliente  =  (cliente :Socket)=>{
  

} 
export const desconectar  = (cliente : Socket)=>{
    cliente.on('disconnect', ()=>{
     listaUsuario.borrarUsuario(cliente.id).then( ()=>{       
     })   
    })
}
export const mensaje  =  ( cliente : Socket , io:Server) =>{
    cliente.on('mensaje' , ( payload : { de :string , mensaje : string})=>{
         
        io.emit('mensaje-nuevo' , payload);
        
    });
}
export const configurarUsuario  =  ( cliente : Socket , io:Server) =>{
    cliente.on('configurar-usuario' , async ( payload : { idbd:string} ,callback)=>{             
        await listaUsuario.otorgarSesion( cliente.id , payload.idbd);
        let user = await listaUsuario.getUsuario(payload.idbd);
         let users = await listaUsuario.listarUsuarios();                  
         io.emit('nuevo-usuario' ,  { user, users  });
         //notificar 
         callback( {  ok : true ,mesage : user});     
    });
}
