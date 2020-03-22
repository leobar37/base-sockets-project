import {Request , Response , Router } from 'express';
import  usuario from './usuario.route';
import mensaje from './mensaje.route'
export const router  =Router();

router.use(usuario);
router.use(mensaje);

// router.get('/mensajes' , ( req : Request , res : Response )=>{
  
//   res.json( { ok : true })

// });
// router.post('/mensajes' , ( req : Request , res : Response )=>{
  
//   res.json( { ok : true })

// });
export default  router;
