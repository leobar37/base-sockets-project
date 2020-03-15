import {Request , Response , Router } from 'express';

export const router =Router();


router.get('/mensajes' , ( req : Request , res : Response )=>{
  
  res.json( { ok : true })

});
router.post('/mensajes' , ( req : Request , res : Response )=>{
  
  res.json( { ok : true })

});



export default  router;
