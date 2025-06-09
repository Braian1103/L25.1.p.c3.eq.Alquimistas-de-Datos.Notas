export default class Cl_mEvaluacion{
    constructor({codigo, nombre, valor}){
        this.codigo = codigo;
        this.nombre = nombre;
        this.valor = valor;
    }
    set codigo(o){
        this._codigo = o.toUpperCase();
      }
      get codigo(){
        return this._codigo;
      }
      set nombre(t){
        this._nombre = t.trim();
      }
      get nombre(){
        return this._nombre;
      }
      set valor(v){
        this._valor = +v;
      }
      get valor(){
        return this._valor;
      }
    }
