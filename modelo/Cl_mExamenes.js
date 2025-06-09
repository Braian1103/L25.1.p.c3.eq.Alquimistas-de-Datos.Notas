export default class Cl_mExamenes{
    constructor({cedula}){
        this.cedula = cedula;
        this.evaluaciones = [];
    }
  
     agregar(codigo){
        if(this.evaluaciones.some(e=>e.codigo===codigo.codigo)){
            return "Codigo ya registrado";
        }else{
            this.evaluaciones.push({codigo: codigo.codigo, nota: codigo.nota});
            return true;
        }
    }
    eliminar(codigo) {
      let eliminarIndex = this.evaluaciones.findIndex(
        (e) => e.codigo === codigo.codigo);
      if (eliminarIndex === -1) {
        return "Codigo no existe";
      } else {
        this.evaluaciones.splice(eliminarIndex, 1);
        return true;
      }

    }
     existe(codigo) {
    let encontrado = false;

    this.evaluaciones.forEach((evaluacion) => {
      if (evaluacion.codigo === codigo) {
        encontrado = true;
      }
    });
    return encontrado;
  }
    listado(evaluaciones) {
    let arrResult = [];
    this.evaluaciones.forEach((evaluacion) => {
      let ev = evaluaciones.find((e) => e.codigo === evaluacion.codigo);
      arrResult.push({
        codigo: evaluacion.codigo,
        nombre: ev.nombre,
        valor: ev.valor,
        nota: evaluacion.nota,
      });
    });

    return arrResult;
  }
}