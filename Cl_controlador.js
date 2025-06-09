import vistas from "./data/vistas.js";
import rolesFichas from "./data/rolesFichas.js";
export default class Cl_controlador {
  constructor({ mSemestre, vApp }) {
    this.mSemestre = mSemestre;
    this.vApp = vApp;
  }
  activarVista({ vista, rol, objeto }) {
    this.vApp.activarVista({ vista });
    this.vApp.vEstudiante.activarVista({ vista, rol, estudiante: objeto });
    this.vApp.vEstudiantes.activarVista({ vista, rol });
    this.vApp.vEvaluacion.activarVista({ vista, rol, evaluacion: objeto });
    this.vApp.vEvaluaciones.activarVista({ vista, rol });
    this.vApp.vExamen.activarVista({
      vista,
      rol,
      examen: objeto,
    });
  }
  cambiarLapso() {
    let nombre = prompt("Nombre del lapso académico:", this.mSemestre.nombre);
    if (nombre) {
      this.mSemestre.nombre = nombre;
      this.activarVista({ vista: vistas.app });
    }
  }
  procesarEstudiante({ rol, cedula = null }) {
    if (rol === rolesFichas.agregar)
      return this.mSemestre.agregarEstudiante(
        this.vApp.vEstudiante.dataEstudiante()
      );
    else if (rol === rolesFichas.modificar)
      return this.mSemestre.modificarEstudiante(
        this.vApp.vEstudiante.dataEstudiante()
      );
    else if (rol === rolesFichas.eliminar)
      return this.mSemestre.eliminarEstudiante(this.vApp.vEstudiante.cedula);
    else return "Opción inválida";
  }
  procesarEvaluacion({ rol, codigo = null }) {
    if (rol === rolesFichas.agregar)
      return this.mSemestre.agregarEvaluacion(
        this.vApp.vEvaluacion.dataEvaluacion()
      );
    else if (rol === rolesFichas.modificar)
      return this.mSemestre.modificarEvaluacion(
        this.vApp.vEvaluacion.dataEvaluacion()
      );
    else return "Opción inválida";
  }
  registrarExamen() {
    let data = this.vApp.vExamen.dataExamen();
    if (!this.mSemestre.estudiantes.existe(data.cedula))
      return "Estudiante inexistente";
    if (!this.mSemestre.evaluaciones.existe(data.codigo))
      return "Evaluacion inexistente";
    let resultado = this.mSemestre.notas.registrarExamen(data);
    return resultado;
  }
}
