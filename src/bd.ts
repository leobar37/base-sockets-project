import  lowdb from 'lowdb'
import FileAsync from "lowdb/adapters/FileAsync"
import { Isuario, Ichat, Imensaje } from './models/interfaces';
import { Usuario } from './classes/usuario';

let db  :any;
export const create  = async ()=>{
    const adapter  = new FileAsync("db.json");
     db = await lowdb(adapter);
     db.defaults({
         users : [],
         chats : []
    }).write();
}
/*=============================================
=            usuario            =
=============================================*/
let collection = 'users'; 
let chatCollec = 'chats';
export const  agregarUsuario =async ( data: Usuario)=>{
   //verifica si existe un usuario con el mismo nombre
   let usuario = await db.get(collection).find({ nombre : data.nombre }).value();
   //si existe
    if(usuario != undefined){
        return  null;
    }else{
        //agregar
        await  db.get(collection).push(data).write();
        //  data.password = ':)';
        let chat :Ichat = {
            userId: data.idBD,
            mensajes : [],
        }
        await db.get(chatCollec).push(chat).write();
    //    let tmp =  data;
    //    tmp.password = ':0';
        return  data;
    }
}

export const actualizarUsuario = async (idbd:string , id:string)=>{
    //actualiza al usuario con su id de sesion
    await db.get(collection).find({idBD : idbd}).assign( {id : id}).write();
}

export const retornaUsuario = async (idbase:string)=>{
    let user = await db.get(collection).find({idBD :idbase }).value();
    return user;
}

export const eliminarSesion = async ( idn :string)=>{
    //   let user = await db.get(collection).find({idBD :idbase }).value();
    await db.get(collection).find({id : idn}).assign( {id : ''}).write();
    
}

export const getUsuarios = async ()=>{
   let usuarios =  await  db.get(collection).value();
  return usuarios;
}
export const verificarUsuario = async ( nombre:string )=>{
    let user = await db.get(collection).find({nombre :nombre }).value();
    return user;
}
export const getConnection = async () => await db;

/*=============================================
=            mensajes            =
=============================================*/

export const agregarMensaje = async ( idbd :string , mensaje :Imensaje)=>{
let chats :Ichat  = await db.get(chatCollec).find({userId : idbd}).value();
let msjs : Imensaje[]= [];
if(chats?.mensajes != undefined){
    msjs=  chats.mensajes; 
}
msjs.push(mensaje);
await db.get(chatCollec).find({userId : idbd}).assign({ mensajes : msjs}).write();
return chats;
}

export const getMsjs = async (idbd :string)=>{
    let chats :Ichat = await db.get(chatCollec).find({userId : idbd}).value();
    console.log('imprimiendo chat');
    
    let msjs : Imensaje[]= [];
    if(chats?.mensajes != undefined){
        msjs=  chats.mensajes; 
    }
    
 return msjs;

}





