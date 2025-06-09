import examenNuevo from "../data/examenNuevo.js";
import vistas from "../data/vistas.js";
import rolesFichas from "../data/rolesFichas.js";
export default class Cl_vExamen {
  constructor() {
    this.controlador = null;
    this.vista = document.getElementById("examenForm");
    this.vista.hidden = true;

    this.inCedula = document.getElementById("examenForm_inCedula");
    this.inCodigo = document.getElementById("examenForm_inCodigo");
    this.inNota = document.getElementById("examenForm_inNota");

    this.btAceptar = document.getElementById("examenForm_btAceptar");
    this.btAceptar.onclick = () => {
      if (confirm(`Seguro que desea registrar la nota?`)) {
        let result = this.controlador.registrarExamen();
        if (result === true)
          this.controlador.activarVista({ vista: vistas.app });
        else alert(result);
      }
    };

    this.btCancelar = document.getElementById("examenForm_btCancelar");
    this.btCancelar.onclick = () => {
      this.controlador.activarVista({ vista: vistas.app });
    };
  }
  get cedula() {
    return +this.inCedula.value;
  }
  get codigo() {
    return this.inCodigo.value.toUpperCase();
  }
  get nota() {
    return +this.inNota.value;
  }
  iniciar(controlador) {
    this.controlador = controlador;
  }
  dataExamen() {
    return {
      cedula: this.cedula,
      codigo: this.codigo,
      nota: this.nota,
    };
  }
  activarVista({ vista, rol, examen = examenNuevo }) {
    this.vista.hidden = vista !== vistas.examen;
    if (vista === vistas.examen) {
      this.rol = rol;
      this.inCedula.value = examen.cedula;
      this.inCodigo.value = examen.codigo;
      this.inNota.value = examen.nota;
    }
  }
}
