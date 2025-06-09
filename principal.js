import Cl_vAplicacion from "./vista/Cl_vAplicacion.js";
import Cl_mSemestre from "./modelo/Cl_mSemestre.js";
import Cl_controlador from "./Cl_controlador.js";
import dataEstudiantes from "./data/dataEstudiantes.js";
import dataEvaluaciones from "./data/dataEvaluaciones.js";
import Cl_mEstudiante from "./modelo/Cl_mEstudiante.js";
import Cl_mEvaluacion from "./modelo/Cl_mEvaluacion.js";
import vistas from "./data/vistas.js";
import dataNotas from "./data/dataNotas.js";

export default class Cl_principal {
  constructor() {
    let vApp = new Cl_vAplicacion();
    let mSemestre = new Cl_mSemestre({ nombre: "Primero" });
    dataEstudiantes.forEach((estudiante) =>
      mSemestre.estudiantes.agregar(new Cl_mEstudiante(estudiante))
    );
    dataEvaluaciones.forEach((evaluacion) =>
      mSemestre.evaluaciones.agregar(new Cl_mEvaluacion(evaluacion))
    );
    dataNotas.forEach((examenes) => {
      examenes.evaluaciones.forEach(({ codigo, nota }) => {
        mSemestre.notas.registrarExamen({
          cedula: examenes.cedula,
          codigo,
          nota,
        });
      });
    });
    let controlador = new Cl_controlador({
      mSemestre: mSemestre,
      vApp: vApp,
    });
    vApp.controlador = controlador;
    controlador.activarVista({ vista: vistas.app });
  }
}
