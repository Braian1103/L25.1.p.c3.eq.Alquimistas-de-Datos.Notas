import Cl_mExamenes from "./Cl_mExamenes.js";
export default class Cl_mNotas {
    constructor() {
        this.array = [];
    }
   existe(cedula) {
    let encontrado = this.indexDe(cedula)
   if (encontrado === -1) {
      return false;
    } else {
      return true;
    }
  }
  indexDe(cedula) {
    return this.array.findIndex((notas) => notas.cedula === cedula.cedula);
  }
  registrarExamen(examen) {
    let estudianteIndex = this.indexDe(examen);
    if (estudianteIndex === -1) {
      this.array.push(new Cl_mExamenes({cedula:examen.cedula}));
      estudianteIndex = this.array.length - 1;
    }
    return this.array[estudianteIndex].agregar({codigo: examen.codigo, nota: examen.nota});
    }
  listado(Cl_mEstudiantes) {
    let arrayEstu = [];
    Cl_mEstudiantes.forEach((estudiantes) => {
      let estu = this.array.find((e) => {
        return e.cedula === estudiantes.cedula;
      });
      if (estu !== undefined) {
        arrayEstu.push({
          cedula: estu.cedula,
          nombre: estudiantes.nombres,
          cntExamenes: estu.evaluaciones.length,
        });
      }
    });
    return arrayEstu;
  }
}
