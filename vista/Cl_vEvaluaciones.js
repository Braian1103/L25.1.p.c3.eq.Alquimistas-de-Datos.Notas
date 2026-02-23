import vistas from "../data/vistas.js";
import rolesFichas from "../data/rolesFichas.js";
export default class Cl_vEvaluaciones {
  constructor() {
    this.controlador = null;
    this.vista = document.getElementById("evaluacionesForm");
    this.vista.hidden = true;

    this.tabla = document.getElementById("evaluacionesForm_tabla");

    this.btAgregar = document.getElementById("evaluacionesForm_btAgregar");
    this.btAgregar.onclick = () =>
      this.controlador.activarVista({
        vista: vistas.evaluacion,
        rol: rolesFichas.agregar,
      });

    this.btModificar = document.getElementById("evaluacionesForm_btModificar");
    this.btModificar.onclick = () => {
      let evaluacion = this.evaluacion();
      if (evaluacion)
        this.controlador.activarVista({
          vista: vistas.evaluacion,
          rol: rolesFichas.modificar,
          objeto: evaluacion,
        });
    };
    this.btVolver = document.getElementById("evaluacionesForm_btVolver");
    this.btVolver.onclick = () =>
      this.controlador.activarVista({ vista: vistas.app });

    this.btEstudiantes = document.getElementById("evaluacionesForm_btEstudiantes");
    this.btEstudiantes.onclick = () =>
      this.controlador.activarVista({
        vista: vistas.estudiantes,
      });
  }
  iniciar(controlador) {
    this.controlador = controlador;
  }
  activarVista({ vista }) {
    this.vista.hidden = vista !== vistas.evaluaciones;
    if (vista == vistas.evaluaciones)
      this.reportar(this.controlador.mSemestre.evaluaciones.listado());
  }
  evaluacion() {
    let codigo = prompt("Indique el código de la evaluación:"),
      evaluacion = this.controlador.mSemestre.evaluaciones.evaluacion(codigo);
    if (!evaluacion) alert("Código inexistente");
    return evaluacion;
  }
  reportar(info) {
    this.tabla.innerHTML = "";
    info.map((evaluacion) => {
      this.tabla.innerHTML += `<tr>
      <td>${evaluacion.codigo}</td>
      <td>${evaluacion.nombre}</td>
      <td>${evaluacion.valor}</td>
    </tr>`;
    });
  }
}
