export default class Cl_mEstudiantes{
    constructor(){
        this.array = [];
    }
   agregar(estudiante) {
    if (this.array.some((e) => e.cedula === estudiante.cedula)) {
      return "Estudiante ya registrado";
    } else {
      this.array.push(estudiante);
      return true;
    }
  }
   modificar(estudiante) {
      let index = this.indexDE(estudiante.cedula);
      if (index === -1) {
        return "Estudiante no existe";
      } else {
        this.array[index] = estudiante;
        return true;
      }
    } 
     eliminar(cedula) {
    let eliminarIndex = this.indexDE(cedula);
    if (eliminarIndex === -1) {
      return "Estudiante no existe";
    } else {
      this.array.splice(eliminarIndex, 1);
      return true;
    }
  }
    listado(){
        return this.array;
    }
     existe(cedula) {
    let encontrado = false;

    this.array.forEach((estudiante) => {
      if (estudiante.cedula === cedula) {
        encontrado = true;
      }
    });
    return encontrado;
  }
  indexDE(cedula) {
    return this.array.findIndex((estudiante) => estudiante.cedula === cedula);
  }
  estudiante(cedula) {
    return this.array.find((estudiante) => estudiante.cedula === cedula);
  }
  cantidadConCedulaEntre({ cedulaMin, cedulaMax }) {
    return this.array.filter(
      (estudiante) => estudiante.cedula >= cedulaMin && estudiante.cedula <= cedulaMax
    ).length;
  }
}