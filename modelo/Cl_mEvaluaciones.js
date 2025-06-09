export default class Cl_mEvaluaciones{
    constructor(){
        this.array = [];
    }
      agregar(evaluacion) {
    if (this.array.some((e) => e.codigo === evaluacion.codigo)) {
      return "Estudiante ya registrado";
    } else {
      this.array.push(evaluacion);
      return true;
    }
  }
   modificar(evaluacion) {
      let evaluacionIndex = this.indexDE(evaluacion);
      if (evaluacionIndex === -1) {
        return "EValuacion no existe";
      } else {
        this.array[evaluacionIndex] = evaluacion;
        return true;
      }
    } 
  listado() {
    return this.array;
  }
  existe(codigo) {
    let encontrado = false;

    this.array.forEach((estudiante) => {
      if (estudiante.codigo === codigo) {
        encontrado = true;
      }
    });
    return encontrado;
  }
  indexDE(codigo) {
    return this.array.findIndex((evaluacion) => evaluacion.codigo === codigo.codigo);
  }
  evaluacion(codigo) {
    return this.array.find((evaluacion) => evaluacion.codigo === codigo);
  }
   conValor(valor) {
    return this.array.filter((evaluacion) => evaluacion.valor === valor).length;
  }
}