import {Request , Response , Router } from 'express';
import Server from '../classes/server';
import { agregarMensaje, getMsjs } from '../bd';
import { mensaje } from '../sockets/socket';
import { Imensaje } from '../models/interfaces';
import { UsuarioList } from '../classes/usuarioLista';
import { Usuario } from '../classes/usuario';
const ctrlUsuarios =  new UsuarioList();
export const router =Router();
router.get('/mensajes' , ( req : Request , res : Response )=>{
    
    res.json( { ok : true })
    
});
router.post('/mensaje/:id' ,async ( req : Request , res : Response )=>{
    const { de ,  para , mensaje }  = req.body;
    const { id } = req.params;
    //emitir mensaje    
    const server = Server.instance;
 let msj:Imensaje= {
     de :de,
     para : para,
     mensaje :mensaje
 }
 let recibido :boolean = false;
 let user :Usuario = await ctrlUsuarios.getUsuario(id);
 let  chats =  await agregarMensaje(id , msj);
 if(user.id && user.id.length > 0){
     recibido =  true;
    server.io.in(user.id).emit('mensaje-privado' , { mensaje : true}); 
 }
 res.json( { ok : true , recibido});
});

router.get('/mensaje/:id' , async (req: Request, res :Response  )=>{
//devolver los mensajes nuevos 
const {  id  }  = req.params;
   let chats =await getMsjs(id);
   
   res.json({ chats});
});


export default router;