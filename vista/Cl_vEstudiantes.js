import vistas from "../data/vistas.js";
import rolesFichas from "../data/rolesFichas.js";
export default class Cl_vEstudiantes {
  constructor() {
    this.controlador = null;
    this.vista = document.getElementById("estudiantesForm");
    this.vista.hidden = true;

    this.tabla = document.getElementById("estudiantesForm_tabla");

    this.btAgregar = document.getElementById("estudiantesForm_btAgregar");
    this.btAgregar.onclick = () =>
      this.controlador.activarVista({
        vista: vistas.estudiante,
        rol: rolesFichas.agregar,
      });

    this.btModificar = document.getElementById("estudiantesForm_btModificar");
    this.btModificar.onclick = () => {
      let estudiante = this.estudiante();
      if (estudiante)
        this.controlador.activarVista({
          vista: vistas.estudiante,
          rol: rolesFichas.modificar,
          objeto: estudiante,
        });
    };

    this.btEliminar = document.getElementById("estudiantesForm_btEliminar");
    this.btEliminar.onclick = () => {
      let estudiante = this.estudiante();
      if (estudiante)
        this.controlador.activarVista({
          vista: vistas.estudiante,
          rol: rolesFichas.eliminar,
          objeto: estudiante,
        });
    };

    this.btVolver = document.getElementById("estudiantesForm_btVolver");
    this.btVolver.onclick = () =>
      this.controlador.activarVista({ vista: vistas.app });
  }
  iniciar(controlador) {
    this.controlador = controlador;
  }
  activarVista({ vista, rol }) {
    this.vista.hidden = vista !== vistas.estudiantes;
    if (vista == vistas.estudiantes)
      this.reportar(this.controlador.mSemestre.estudiantes.listado());
  }
  estudiante() {
    let cedula = +prompt("Indique la cedula del estudiante:"),
      estudiante = this.controlador.mSemestre.estudiantes.estudiante(cedula);
    if (!estudiante) alert("Cedula inexistente");
    return estudiante;
  }
  reportar(info) {
    this.tabla.innerHTML = "";
    info.map((estudiante) => {
      this.tabla.innerHTML += `<tr>
      <td>${estudiante.cedula}</td>
      <td>${estudiante.apellidos}</td>
      <td>${estudiante.nombres}</td>
    </tr>`;
    });
  }
}
