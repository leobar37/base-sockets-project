import {Request , Response , Router } from 'express';

import { v4 as uuid } from 'uuid'

import { UsuarioList } from '../classes/usuarioLista';
let ctrlUser = new UsuarioList();
export const router =Router();
import bycript from 'bcrypt'
import { Usuario } from '../classes/usuario';
router.post('/login' , async ( req : Request, res :Response)=>{
    let { name , password } =  req.body;
    let error = false;
    let user  = await  ctrlUser.loguinUsuario(name , password).catch( err =>{
      error = true;
      res.json(err);
    });
    if(error == false)
    res.json({ok : true  , user });
  });
  router.post('/register' , async ( req : Request, res :Response)=>{
    let { nombre , password  } =  req.body;
    //guardar bd
    let us = new Usuario('', uuid());
    us.nombre = nombre;
    us.password = await bycript.hashSync( password ,10); 
    let rpta :any =await ctrlUser.agregar(us);
    let user = new Usuario();
     user = rpta;
     user.password = '>';
  res.json({ok : true  , rpta :user});
});


export default router;