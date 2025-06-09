export default class Cl_mEstudiante{
    constructor({cedula, apellidos, nombres}){
        this.cedula = cedula;
        this.apellidos = apellidos;
        this.nombres = nombres;
  }
  set cedula(c){
    this._cedula = +c;
  }
  get cedula(){
    return this._cedula;
  }
  set apellidos(a){
    this._apellidos = a.toUpperCase();
  }
  get apellidos(){
    return this._apellidos;
  }
  set nombres(n){
    this._nombre = n.toUpperCase();
  }
  get nombres(){
    return this._nombre;
  }
}