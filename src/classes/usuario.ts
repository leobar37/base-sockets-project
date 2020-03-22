export class Usuario {
    public nombre :string;
   public password:string;
    public sala :string;
    public id ?:string;
    public idBD ?:string;
    constructor (id ?:string, idbd ? :string){
     this.id = id;
     this.idBD = idbd;
     this.nombre = 'sin-nombre';
     this.sala = 'sin-sala';     
     this.password  ='';
    } 
    
}